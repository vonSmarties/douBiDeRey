import "../service/react";
import "../service/reactDom";


export default class Info extends React.Component {

    render = () => {
        return <div className="containerInfo" dangerouslySetInnerHTML={{ __html: this.props.info.html }}></div>
    };
}