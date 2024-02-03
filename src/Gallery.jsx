import "../service/react.js";
import ApiService from "../service/api.js";

export default class Gallery extends React.Component {

    fullScreen = React.createRef();
    imgFull = React.createRef();
    scale = 1;
    initialX = null;
    initialY = null;

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            fullScreen: false,
            displayed: null,
            isFull: false,
            downloadEnabled: true
        }
    }

    componentDidMount = () => {
        if (!this.state.images) {
            const apiSvc = new ApiService();
            apiSvc.post("imageGallery", this.props.gallery).then(images =>
                this.setState({ images })
            );
        }
    }

    openModal = () => {
        window.addEventListener('popstate', this.handlePopstate, { once: true })
        this.setState({ isOpen: true });
        history.pushState({}, "", window.location.href);
    }

    handlePopstate = () => {
        this.setState({ isOpen: false });
    }

    closeModal = () => {
        history.back();
        window.removeEventListener('popstate', this.closeModal, { once: true })
        this.setState({ isOpen: false });
    }

    requestFullScreen = (displayed) => {
        this.setState({ fullScreen: true }, () => {
            this.fullScreen.current.requestFullscreen();
            this.fullScreen.current.addEventListener('touchstart', this.startTouch);
            this.fullScreen.current.addEventListener('touchmove', this.moveTouch);
            this.fullScreen.current.addEventListener('scroll', this.zoom);
            this.fullScreen.current.addEventListener("fullscreenchange", this.handleFullScreen);
            this.setState({ displayed });
        });
    }

    handleFullScreen = () => {
        this.setState({ isFull: !this.state.isFull },
            () => {
                if (!this.state.isFull)
                    this.closeFullScreen();
            });
    }

    closeFullScreen = () => {
        this.setState({ fullScreen: false, displayed: null, isFull: false });
    }

    startTouch = (e) => {
        this.initialX = e.touches[0].clientX;
        this.initialY = e.touches[0].clientY;
    }

    moveTouch = (e) => {
        if (this.initialX == null || this.initialY == null) {
            return;
        }

        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;

        let diffX = this.initialX - currentX;
        let diffY = this.initialY - currentY;

        console.log(diffX, this.state.displayed, this.state.images.length - 1)

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
                // swiped left
                this.nextImage();
            } else {
                // swiped right
                this.prevImage();
            }
        }

        this.initialX = null;
        this.initialY = null;

        e.preventDefault();
    }

    zoom = (event) => {
        console.log("something append", event.deltaY)
        event.preventDefault();

        this.scale += event.deltaY * -0.01;

        // Restrict scale
        this.scale = Math.min(Math.max(1, this.scale), 4);

        // Apply scale transform
        this.imgFull.current.style.transform = `scale(${this.scale})`;
    }


    prevImage = () => {
        if (this.state.displayed > 0)
            this.setState({ displayed: this.state.displayed - 1 })
    }

    nextImage = () => {
        if (this.state.displayed < this.state.images.length - 1)
            this.setState({ displayed: this.state.displayed + 1 })
    }

    render = () => {
        return <div className="galleryWrapper">
            <div className="galleryContainer" onClick={this.openModal}>
                <div className="galleryDisplay">{this.props.gallery.title}</div>
                <div className="previewGallery">
                    {this.state.images && this.state.images[0] &&
                        <img className="previewImage" src={this.state.images[0].file}></img>
                    }
                </div>
            </div>
            {this.state.isOpen && <div>
                <div className="modalGallery">
                    <div className="modalHeader">
                        <div className="headerElm downloadContainer">
                            <a
                                className={"downloadButton"}
                                href={"./gallery/" + this.props.gallery.id + "/export.zip"}
                                download={this.props.gallery.title + ".zip"}
                            >
                                Télécharger
                            </a>
                        </div>
                        <div className="headerElm closeContainer">
                            <div
                                className="modalCloseContainer"
                                onClick={this.closeModal}
                            >
                                <div className="modalClose1"></div>
                                <div className="modalClose2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="modalScroll">
                        <div className="galleryDisplay">{this.props.gallery.title}</div>
                        {this.state.images
                            ? this.state.images.map((image, index) => <div
                                key={image.file}
                                // href={image.file}
                                // target="_blank"
                                className="imageContainer"
                                onClick={() => this.requestFullScreen(index)}
                            >
                                <img className="imageModal" src={image.file}></img>
                            </div>
                            ).concat(this.state.images.map((_, index) =>
                                <div className="imageErsatz" key={"void" + index}></div>
                            ))
                            : <div>Chargement</div>
                        }
                    </div>
                    {
                        this.state.fullScreen && <div ref={this.fullScreen}>
                            {
                                this.state.displayed != 0 &&
                                <div className="controlLeftFull" onClick={this.prevImage}>{"<"}</div>
                            }
                            {
                                this.state.displayed != this.state.images.length - 1 &&
                                <div className="controlrightFull" onClick={this.nextImage}>{">"}</div>
                            }
                            <div className="controlcloseFull" onClick={this.closeFullScreen}>
                                <div className="modalClose1"></div>
                                <div className="modalClose2"></div>
                            </div>
                            {
                                this.state.displayed != null &&
                                <img className="imageFull" ref={this.imgFull} src={this.state.images[this.state.displayed].file}></img>
                            }
                        </div>
                    }
                </div>
                <div className="greyScreen" onClick={this.closeModal}></div>
            </div>
            }
        </div>
    };
}