import "../service/react.js";
import "../service/reactDom.js";
import ApiService from "../service/api.js";
import Member from "./Member.js";


export default class Board extends React.Component {

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.load("memberAll").then(board =>
            this.setState({ board })
        );
    }

    render = () => {
        return <div className="boardContainer">
            {
                this.state && this.state.board.map(member => 
                    <Member key={member.id} member={member}></Member>
                ).concat(this.state.board.map((_,index) =>
                <div className="boardErsatz" key={"void" + index}></div>
            ))
            }
        </div>
    };
}

const board = React.createElement(Board);
const boardContainer = document.getElementById('board');
const boardDOM = ReactDOM.createRoot(boardContainer);
boardDOM.render(board);