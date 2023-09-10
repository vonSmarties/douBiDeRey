import ApiService from "../service/api.js";
import Info from "./Info.js";
import "../service/react.js";
import "../service/reactDom.js";


class AllInfo extends React.Component {

    informations = window['informations'];

    render = () => {
        return this.informations && this.informations.length > 0
            ? this.informations.map(info =>
                <Info info={info} key={info.id} />
            )
            : <div>Rien à annoncer pour le moment, revenez plus tard pour plus d'informations</div>;
    }
}

const infos = React.createElement(AllInfo);
const infosContainer = document.getElementById('infos');
const infosDOM = ReactDOM.createRoot(infosContainer);
infosDOM.render(infos);