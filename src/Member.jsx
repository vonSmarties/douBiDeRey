import "../service/react.js";

export default class Member extends React.Component {

    render = () => {
        return <div
            className={"cardMember " + this.props.className}
            onClick={this.props.onClick}
            draggable={this.props.draggable}
            onDragStartCapture={this.props.onDragStart}
        >
            <img className="pictMember" src={this.props.member.picture} alt="moustache" />
            <div className="memberContainer">
                <div className="roleMember lineMember">{this.props.member.role}</div>
                <div className="lineMember">
                    <div className="lineMemberItem">{this.props.member.name}</div>
                    <div className="lineMemberItem">{this.props.member.firstName}</div>
                </div>
                <div className="lineMember emailMember">{this.props.member.email}</div>
                <div className="lineMember">
                    {
                        this.props.member.mobile &&
                        <div className="lineMemberItem">{this.props.member.mobile}</div>
                    }
                    {
                        this.props.member.phone && this.props.member.mobile &&
                        <div className="lineMemberItem separator">/</div>
                    }
                    {
                        this.props.member.phone &&
                        <div className="lineMemberItem phone">{this.props.member.phone}</div>
                    }
                </div>
                <div className="lineMember">{this.props.member.address}</div>
                <div className="lineMember">{this.props.member.city}</div>
            </div>
        </div>
    };
}