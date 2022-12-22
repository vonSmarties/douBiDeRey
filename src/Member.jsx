import "../service/react";
import "../service/reactDom";

export default class Member extends React.Component {

    render = () => {
        return <div className="cardMember">
            <div className="pictContainer">
                <img className="pictMember" src={this.props.member.picture} alt="moustache" />
            </div>
            <div className="memberContainer">
                <div className="roleMember lineMember">{this.props.member.role}</div>
                <div className="lineMember">
                    <div className="lineMemberItem">{this.props.member.name}</div>
                    <div className="lineMemberItem">{this.props.member.firstName}</div>
                </div>
                <div className="lineMember">
                    <div className="lineMemberItem">{this.props.member.mobile}</div>
                    <div className="lineMemberItem">{this.props.member.phone}</div>
                </div>
                <div className="lineMember">{this.props.member.address}</div>
                <div className="lineMember">{this.props.member.city}</div>
            </div>
        </div>
    };
}