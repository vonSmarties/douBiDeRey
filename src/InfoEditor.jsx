import "../service/react.js";
import "../service/quill.js";
import ApiService from "../service/api.js";


export default class InfoEditor extends React.Component {

    quill;
    quillContainer;
    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.quillContainer = React.createRef();
    }

    componentDidMount = () => {
        this.quill = new Quill(this.quillContainer.current, {
            modules: {
                toolbar: [
                    [{ 'font': [] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'align': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],

                    ['clean']                                         // remove formatting button
                ]
            },
            theme: 'snow'
        });
        if (this.props.info && this.props.info.delta)
            this.quill.setContents(JSON.parse(this.props.info.delta));
    }

    save = () => {
        const body = { delta: JSON.stringify(this.quill.getContents()) };
        if (this.props.info.id) {
            body.id = this.props.info.id;
            this.apiSvc.post("infoUpdate", body).then(rtrn => {
                if (rtrn.update) {
                    this.props.updateList(body);
                    this.props.close();
                } else {
                    window.alert("Echec de l'édition");
                }
            });
        } else {
            this.apiSvc.post("infoCreate", body).then(rtrn => {
                if (rtrn.create) {
                    body.id = rtrn.id;
                    this.props.addInList(body);
                    this.props.close();
                } else {
                    window.alert("Echec de la création");
                }
            });
        }
    }

    delete = () => {
        if (window.confirm("Confirmez vous la suppression de cette information ?"))
            this.apiSvc.post("infoDelete", this.props.info).then(rtrn => {
                if (rtrn.delete) {
                    this.props.delFromList(this.props.info);
                } else {
                    window.alert("Echec de la suppression");
                }
            });
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
            <div className="containerInfo">
                <div ref={this.quillContainer}></div>
            </div>
            <div className="bottomRow bottomModal">
                <div
                    onClick={this.save}
                    className="editButtonLight"
                >sauvegarder</div>
                {this.props.info.id && <div
                    onClick={this.delete}
                    className="editButtonLight"
                >supprimer</div>}
            </div>
        </div>
    };
}