import ApiService from "../service/api.js";
import Info from "./Info.js";
import "../service/react.js";
import "../service/reactDom.js";


class AllInfo extends React.Component {

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.load("infoAll").then(infos => this.setState({ infos }));

    }

    render = () => {
        return this.state
            ? this.state.infos.map(info =>
                <Info info={info} key={info.id} />
            )
            : <div>chargement</div>
    };
}

const infos = React.createElement(AllInfo);
const infosContainer = document.getElementById('infos');
const infosDOM = ReactDOM.createRoot(infosContainer);
infosDOM.render(infos);