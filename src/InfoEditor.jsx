import "../service/react";
import "../service/reactDom";
import "../service/quill";
import ApiService from "../service/api";


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
                }
            });
        } else {
            this.apiSvc.post("infoCreate", body).then(rtrn => {
                if (rtrn.create) {
                    body.id = rtrn.id;
                    this.props.addInList(body);
                }
            });
        }
    }

    delete = () => {
        if (window.confirm("Confirmez vous la suppression de cette information ?")) 
        this.apiSvc.post("infoDelete", this.props.info).then(rtrn => {
            if (rtrn.delete) {
                this.props.delFromList(this.props.info);
            }
        });
    }

    render = () => {
        return <div className="containerInfo">
            <div><div onClick={this.save}>sauvegarder</div>{this.props.info.id && <div onClick={this.delete}>supprimer</div>}</div>
            <div ref={this.quillContainer}></div>
        </div>
    };
}