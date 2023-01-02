import "../service/react";
import "../service/reactDom";
import ApiService from "../service/api";


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
        return <div>
            <div>Multi-passe</div>
            <input
                type="password"
                onChange={(event) => this.setState({ password: event.currentTarget.value })}
                onKeyUp={(event) => event.key == "Enter" && this.log()}
            />
        </div>
    };
}