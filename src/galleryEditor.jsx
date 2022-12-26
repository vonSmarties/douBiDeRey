import "../service/react";
import "../service/reactDom";
import ApiService from "../service/api";

export default class GalleryEditor extends React.Component {

    fileRef = React.createRef();
    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            title: props.gallery.title,
        }
    }

    componentDidMount = () => {
        if (!this.state.images)
            this.apiSvc.post("imageGallery", this.props.gallery).then(images =>
                this.setState({ images })
            );

    }

    editTitle = (event) =>
        this.setState({ title: event.currentTarget.value })

    saveTitle = (event) => {
        if (event.key == "Enter") {
            const gallery = this.props.gallery;
            gallery.title = this.state.title;
            this.apiSvc.post("galleryUpdate", gallery);
        }
    }

    deleteImg = (image) => {
        this.apiSvc.post("imageDelete", image);
    }

    deleteGallery = () => {
        if (window.confirm("suppression galerie")) {
            this.apiSvc.post("galleryDelete", this.props.gallery);
        }
    }

    addImage = () => {
        const files = this.fileRef.current.files;
        this.upload(files, 0);
    }

    upload = (files, i) => {
        const formData = new FormData();
        formData.append("idGallery", this.props.gallery.id);
        formData.append("file", files[i]);
        this.apiSvc.postRawBody("imageCreate", formData).then(rtrn => {
            this.pushImage({ gallery: this.props.gallery.id, file: rtrn.file });
            if (i < files.length - 1)
                this.upload(files, i + 1);
        });
    }

    pushImage = (image) => {
        const images = this.state.images;
        images.unshift(image);
        this.setState({ images });
    }

    render = () => {
        return <div className="galleryContainer">
            <div className="modalHeader">
                <input type="text" value={this.state.title} onChange={this.editTitle} onKeyUp={this.saveTitle}></input>
                <div
                    className="modalCloseContainer"
                    onClick={this.props.close}
                >
                    <div className="modalClose1"></div>
                    <div className="modalClose2"></div>
                </div>
            </div>
            <div>
                <div
                    onClick={this.deleteGallery}
                >supprimer</div>
                <input name="file[]" type="file" ref={this.fileRef} multiple onInput={this.addImage} />
            </div>
            <div className="modalScroll">
                {this.state.images && this.state.images.map((image) => <div key={image.file}>
                    <img className="imageModal" src={image.file}></img>
                    <div
                        onClick={() => this.deleteImg(image)}
                    >x</div>
                </div>
                )}
            </div>
        </div>
    };
}