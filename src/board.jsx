import "../service/react";
import "../service/reactDom";
import ApiService from "../service/api";
import Member from "./Member";


export default class Board extends React.Component {

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.post("memberAll").then(board =>
            this.setState({ board })
        );
    }

    render = () => {
        return <div className="boardContainer">
            {
                this.state && this.state.board.map(member => 
                    <Member key={member.id} member={member}></Member>
                )
            }
        </div>
    };
}

const board = React.createElement(Board);
const boardContainer = document.getElementById('board');
const boardDOM = ReactDOM.createRoot(boardContainer);
boardDOM.render(board);