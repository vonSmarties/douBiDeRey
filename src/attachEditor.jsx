import "../service/react.js";
import ApiService from "../service/api.js";

export default class AttachEditor extends React.Component {

    fileRef = React.createRef();
    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            title: props.attach ? props.attach.title : "",
            newTitle: false
        }
    }

    editTitle = (event) =>
        this.setState({ title: event.currentTarget.value, newTitle: true });

    saveTitleEvent = (event) => {
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
            title = file.name;
            this.setState({ title });
        }


        console.log("uploadAttach", file);

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
            }
        })
    }

    openInputFile = () => {
        this.fileRef.current.click()
    }

    render() {
        const alreadyExist = this.props.attach && this.props.attach.file;
        return <div className={this.props.className}>
            <div className="editModal">
                <div className="modalHeader">
                    <div
                        className="modalCloseContainer"
                        onClick={this.props.close}
                    >
                        <div className="modalClose1"></div>
                        <div className="modalClose2"></div>
                    </div>
                </div>
                <div className="containerAttach">
                    <div className="titleContainer">
                        <input
                            className="titleInput"
                            type="text"
                            value={this.state.title}
                            onChange={this.editTitle}
                            onKeyUp={this.saveTitleEvent}
                        />
                        {this.state.newTitle &&
                            <div onClick={this.saveTitle} className="editButtonLight">
                                Ok
                            </div>
                        }
                    </div>
                    {alreadyExist
                        ? <React.Fragment>
                            <iframe src={this.props.attach.file} width="100%" height="100%"></iframe>
                        </React.Fragment>
                        : <div className="fileContainer">
                            <input className="addFile" name="file" type="file" ref={this.fileRef} onInput={this.uploadAttach} />
                            <div
                                className="fileButton"
                                onClick={this.openInputFile}
                            >
                                Selectionner un fichier
                            </div>
                        </div>
                    }
                    {alreadyExist &&
                        <div className="deleteButton" onClick={this.deleteAttach}>
                            Supprimer la pièce jointe
                        </div>
                    }
                </div>
            </div>
            <div
                className="greyScreen"
                onClick={() => this.setState({ openModal: false })}
            ></div>
        </div>
    }
}
