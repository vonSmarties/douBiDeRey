import "../service/react.js";
import ApiService from "../service/api.js";

export default class AttachEditor extends React.Component {

    fileRef = React.createRef();
    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            title: props.attach ? props.attach.title : "",
            file: props.attach ? props.attach.file : "",
            newTitle: false,
            isOpenModal: false
        }
    }

    editTitle = (event) =>
        this.setState({ title: event.currentTarget.value, newTitle: true });

    saveTitleAttach = (event) => {
        if (event.key == "Enter")
            this.saveTitle();
    }

    saveTitle = () => {
        const attach = this.props.attach;
        attach.title = this.state.title;
        this.apiSvc.post("attachUpdate", attach).then(rtrn => {
            if (rtrn.update) {
                this.setState({ newTitle: false });
                this.props.updateList(attach);
            } else {
                window.alert("Echec de l'édition");
            }
        });
    }

    deleteAttach = () => {
        if (window.confirm("Confirmez vous la suppression de la pièce jointe ?")) {
            this.apiSvc.post("attachDelete", this.props.attach).then(rtrn => {
                if (rtrn.delete) {
                    this.props.delFromList(this.props.attach);
                    this.props.close();
                } else {
                    window.alert("Echec de la suppression");
                }
            });
        }
    }

    uploadAttach = () => {
        const file = this.fileRef.current.files[0];
        if (!file) {
            window.alert("Aucun fichier sélectionné");
            return;
        }

        let title = this.state.title;
        if (!title) {
            title = file.name.split(".").slice(0, -1).join(".");
            this.setState({ title });
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("idInfo", this.props.idInfo);
        this.apiSvc.postFormData("attachCreate", formData).then(rtrn => {
            if (rtrn.create) {
                this.props.addToList({
                    title: title,
                    file: rtrn.file
                });
                this.setState({ file });
            }
        })
    }

    openInputFile = () => {
        this.fileRef.current.click()
    }

    render() {
        const alreadyExist = this.state.file !== "";
        return <div className={this.props.className}>
            <div
                onClick={() => this.setState({ isOpenModal: true })}
                className="editButtonLight"
            >{alreadyExist ? this.state.title : "Ajouter une pièce jointe"}</div>
            {this.state.isOpenModal &&
                <React.Fragment>
                    <div className="editModal">
                        <div className="modalHeader">
                            <div
                                className="modalCloseContainer"
                                onClick={() => this.setState({ isOpenModal: false })}
                            >
                                <div className="modalClose1"></div>
                                <div className="modalClose2"></div>
                            </div>
                        </div>
                        <div className="containerAttach">
                            <div className="titleContainer">
                                <div>Nom de la pièce jointe :</div>
                                <input
                                    className="titleInput"
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.editTitle}
                                    onKeyUp={this.saveTitleAttach}
                                />
                                {this.state.newTitle &&
                                    <div onClick={this.saveTitle} className="editButtonLight">
                                        Ok
                                    </div>
                                }
                            </div>
                            {alreadyExist
                                ? <iframe src={this.props.attach.file} className="attachDisplay" width="100%" height="100%" />
                                : <div className="fileContainer">
                                    <input className="addFile" name="file" type="file" ref={this.fileRef} onInput={this.uploadAttach} />
                                    <div
                                        className="editButtonLight"
                                        onClick={this.openInputFile}
                                    >
                                        Selectionner un fichier
                                    </div>
                                </div>
                            }
                            {alreadyExist &&
                                <div className="bottomRow bottomModal">
                                    <div
                                        className="editButtonLight"
                                        onClick={this.deleteAttach}
                                    >
                                        Supprimer la pièce jointe
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className="greyScreen"
                        onClick={() => this.setState({ isOpenModal: false })}
                    ></div>
                </React.Fragment>}
        </div>
    }
}
