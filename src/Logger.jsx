import "../service/react.js";
import ApiService from "../service/api.js";


export default class Logger extends React.Component {

    apiSvc = new ApiService();

    constructor(props) {
        super(props);
    }

    log = () => {
        this.apiSvc.log(this.state.password).then(rtrn => {
            if (rtrn.check)
                this.props.login();
        });
    }

    render = () => {
        return <div className={this.props.className}>
            <div className="question">Multi-passe ???</div>
            <input
                type="password"
                onChange={(event) => this.setState({ password: event.currentTarget.value })}
                onKeyUp={(event) => event.key == "Enter" && this.log()}
            />
            <div className="bottomRow">
                <div
                    onClick={this.log}
                    className="editButton"
                >
                    Valider
                </div>
            </div>
        </div>
    };
}