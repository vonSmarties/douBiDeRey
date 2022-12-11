import "../service/react";
import "../service/reactDom";
import ApiService from "../service/api";

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount = () => {
        const apiSvc = new ApiService();
        if (!this.state.images)
            apiSvc.post("imageGallery", this.props.gallery).then(images =>
                this.setState({ images })
            );

    }

    openModal = () => {
        this.setState({ isOpen: true });
    }

    render = () => {
        return <div>
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
                        <div>{this.props.gallery.title}</div>
                        <div
                            className="modalCloseContainer"
                            onClick={() => this.setState({ isOpen: false })}
                        >
                            <div className="modalClose1"></div>
                            <div className="modalClose2"></div>
                        </div>
                    </div>
                    <div className="modalScroll">
                        {this.state.images && this.state.images.map((image) =>
                            <img className="imageModal" key={image.file} src={image.file}></img>
                        )}
                        {this.state.images && this.state.images.map((image) => 
                            <div></div>
                        )}
                    </div>
                </div>
                <div className="greyScreen" onClick={() => this.setState({ isOpen: false })}></div>
            </div>
            }
        </div>
    };
}