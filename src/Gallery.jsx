import "../service/react";
import "../service/reactDom";

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render = () => {
        return <div>
            <div className="galleryDisplay" onClick={() => this.setState({ isOpen: true })}>{this.props.gallery.title}</div>
            {this.state.isOpen && <div>
                <div className="modalGallery">
                    <div className="modalHeader"><div>{this.props.gallery.title}</div><div className="modalClose" onClick={() => this.setState({ isOpen: false })}>x</div></div>
                    <div className="modalScroll">
                        {this.props.images.map((image) => <img className="imageModal" key={image.file} src={image.file}></img>)}
                    </div>
                </div>
                <div className="greyScreen" onClick={() => this.setState({ isOpen: false })}></div>
            </div>
            }
        </div>
    };
}