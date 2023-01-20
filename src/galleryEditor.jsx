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
            newTitle: false
        }
    }

    componentDidMount = () => {
        if (!this.state.images)
            this.apiSvc.post("imageGallery", this.props.gallery).then(images =>
                this.setState({ images })
            );

    }

    editTitle = (event) =>
        this.setState({ title: event.currentTarget.value, newTitle: true });

    saveTitleEvent = (event) => {
        if (event.key == "Enter")
            this.saveTitle();
    }

    saveTitle = () => {
        const gallery = this.props.gallery;
        gallery.title = this.state.title;
        this.apiSvc.post("galleryUpdate", gallery).then(rtrn => {
            if (rtrn.update) {
                this.setState({ newTitle: null });
                this.props.updateList(gallery);
            } else {
                window.alert("Echec de l'édition");
            }
        });
    }

    deleteImg = (image) => {
        this.apiSvc.post("imageDelete", image).then(rtrn => {
            if (rtrn.delete) {
                const images = this.state.images;
                images.splice(images.indexOf(image), 1);
                this.setState({ images });
            } else {
                window.alert("Echec de la suppression");
            }
        });
    }

    deleteGallery = () => {
        if (window.confirm("Confirmez vous la suppression de la galerie ?")) {
            this.apiSvc.post("galleryDelete", this.props.gallery).then(rtrn => {
                if (rtrn.delete) {
                    this.props.delFromList(this.props.gallery);
                } else {
                    window.alert("Echec de la suppression");
                }
            });
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
        this.apiSvc.postFormData("imageCreate", formData).then(rtrn => {
            if (rtrn.create) {
                this.pushImage({ gallery: this.props.gallery.id, file: rtrn.file });
                if (i < files.length - 1)
                    this.upload(files, i + 1);
            } else {
                window.alert("Echec de l'ajout de l'image");
            }
        });
    }

    pushImage = (image) => {
        const images = this.state.images;
        images.push(image);
        this.setState({ images });
    }

    openInputFile = () => {
        this.fileRef.current.click()
    }

    render = () => {
        return <div className={this.props.className}>
            <div className="modalHeader">
                <div
                    className="modalCloseContainer"
                    onClick={this.props.close}
                >
                    <div className="modalClose1"></div>
                    <div className="modalClose2"></div>
                </div>
            </div>
            <div>
                <div className="inputModal">
                    <div style={{ marginRight: "5px" }}>Titre :</div>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.editTitle}
                        onKeyUp={this.saveTitleEvent}
                    ></input>
                    {this.state.newTitle && <div
                        onClick={this.saveTitle}
                        className="editButtonLight"
                    >Ok</div>}
                </div>
                <div className="inputModal">
                    <div onClick={this.openInputFile} className="editButtonLight leftButton">Ajouter des photos</div>
                    <input className="addFile" name="file[]" type="file" ref={this.fileRef} multiple onInput={this.addImage} />
                </div>
            </div>
            <div className="modalScroll">
                {this.state.images && this.state.images.map((image) => <div className="imageContainer" key={image.file}>
                    <img className="imageModal" src={image.file}></img>
                    <div
                        onClick={() => this.deleteImg(image)}
                        className="galleryDelete"
                    >x</div>
                </div>
                )}
            </div>
            <div className="bottomRow bottomModal">
                <div
                    onClick={this.deleteGallery}
                    className="editButtonLight"
                >Supprimer la galerie</div>
            </div>
        </div>
    };
}