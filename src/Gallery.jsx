import "../service/react.js";
import ApiService from "../service/api.js";

export default class Gallery extends React.Component {

    fullScreen = React.createRef();
    imgFull = React.createRef();
    modalScroll = React.createRef();
    swipe = React.createRef();
    swipeWrapper = React.createRef();
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
        window.addEventListener('popstate', this.handlePopstate, { once: true });
        this.setState(
            { isOpen: true, renderedImages: this.state.images.slice(0, 20) },
            () => this.modalScroll.current.addEventListener('scroll', this.lazyLoading)
        );
        history.pushState({}, "", window.location.href);
    }

    handlePopstate = () => {
        if (this.scrollObserver) this.scrollObserver.disconnect();
        this.setState({ isOpen: false });
    }

    closeModal = () => {
        history.back();
        window.removeEventListener('popstate', this.closeModal, { once: true })
    }

    requestFullScreen = (displayed) => {
        this.setState({ fullScreen: true }, () => {
            this.fullScreen.current.requestFullscreen();
            this.swipe.current = new Swiper(this.swipeWrapper.current, {
                // Setting default settings
                initialSlide: displayed,
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                zoom: {
                    limitToOriginalSize: true
                }
            });
            this.fullScreen.current.addEventListener("fullscreenchange", this.handleFullScreen);
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

    lazyLoading = (ev) => {
        if (ev.target.scrollTop + this.modalScroll.current.clientHeight < this.modalScroll.current.scrollHeight)
            return;
        const renderedImages = this.state.renderedImages.concat(this.state.images.slice(this.state.renderedImages.length, this.state.renderedImages.length + 20));
        this.setState(
            { renderedImages },
            () => {
                if (renderedImages.length == this.state.images.length)
                    this.modalScroll.current.removeEventListener('scroll', this.lazyLoading);
            }
        );
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
                    <div className="modalScroll" ref={this.modalScroll}>
                        <div className="galleryDisplay">{this.props.gallery.title}</div>
                        {this.state.images && this.state.renderedImages
                            ? <React.Fragment>
                                {this.state.renderedImages.map((image, index) =>
                                    <div
                                        key={image.file}
                                        // href={image.file}
                                        // target="_blank"
                                        className="imageContainer"
                                        onClick={() => this.requestFullScreen(index)}
                                    >
                                        <img className="imageModal" src={image.file} loading="lazy"></img>
                                    </div>
                                )}
                                {this.state.images.map((_, index) =>
                                    <div className="imageErsatz" key={"void" + index}></div>
                                )}
                            </React.Fragment>
                            : <div>Chargement</div>
                        }
                    </div>
                    {
                        this.state.fullScreen && <div ref={this.fullScreen} className="fullScreenContainer">
                            <div className="controlcloseFull" onClick={this.closeFullScreen}>
                                <div className="modalClose1"></div>
                                <div className="modalClose2"></div>
                            </div>
                            <div ref={this.swipeWrapper} className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        this.state.images.map(image =>
                                            <div key={image.file} className="swiper-slide">
                                                <div className="swiper-zoom-container">
                                                    <img className="imageFull" src={image.file}></img>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="greyScreen" onClick={this.closeModal}></div>
            </div>
            }
        </div>
    };
}