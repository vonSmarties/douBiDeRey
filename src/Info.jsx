import "../service/react";
import "../service/reactDom";
import "../service/quill";


export default class Info extends React.Component {

    quill
    quillContainer

    constructor(props) {
        super(props);
        this.quillContainer = React.createRef();
    }

    componentDidMount = () => {
        this.quill = new Quill(this.quillContainer.current, {
            readOnly: true
        });
        if (this.props.info && this.props.info.delta)
            this.quill.setContents(JSON.parse(this.props.info.delta));
    }

    componentDidUpdate = () => {
        this.quill.setContents(JSON.parse(this.props.info.delta));
    }

    render = () => {
        return <div className={"containerInfo " + this.props.className} onClick={this.props.onClick}>
            <div ref={this.quillContainer}></div>
        </div>
    };
}