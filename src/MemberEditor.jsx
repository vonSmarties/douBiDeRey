import "../service/react";
import "../service/reactDom";
import ApiService from "../service/api";

export default class MemberEditor extends React.Component {

    fileRef = React.createRef();
    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            member: props.member
        };
    }

    upload = () => {
        const files = this.fileRef.current.files[0];
        const formData = new FormData();
        formData.append("memberId", this.props.member.id);
        formData.append("file", files);
        if (this.state.member.picture) {
            this.apiSvc.postFormData("memberImageUpdate", formData).then(rtrn => {
                if (rtrn.update) {
                    const member = this.state.member;
                    member.picture = rtrn.file;
                    this.setState({ member });
                    this.props.updateList(member);
                }
            });
        } else {
            this.apiSvc.postFormData("memberImageCreate", formData).then(rtrn => {
                if (rtrn.create) {
                    const member = this.state.member;
                    member.picture = rtrn.file;
                    this.setState({ member });
                    this.props.updateList(member);
                }
            });
        }
    }

    save = () => {
        const member = this.state.member;
        this.apiSvc.post("memberUpdate", member).then(rtrn => {
            if (rtrn.update)
                this.props.updateList(member);
        });
    }

    delete = () => {
        if (window.confirm("Confirmez vous la suppression du membre du bureau ?"))
            this.apiSvc.post("memberDelete", this.props.member).then(rtrn => {
                if (rtrn.delete)
                    this.props.delFromList(this.props.member);
            });

    }

    editRole = (event) => {
        const member = this.state.member;
        member.role = event.currentTarget.value;
        this.setState({ member });
    }

    editName = (event) => {
        const member = this.state.member;
        member.name = event.currentTarget.value;
        this.setState({ member });
    }

    editFirstName = (event) => {
        const member = this.state.member;
        member.firstName = event.currentTarget.value;
        this.setState({ member });
    }

    editMobile = (event) => {
        const member = this.state.member;
        member.mobile = event.currentTarget.value;
        this.setState({ member });
    }

    editPhone = (event) => {
        const member = this.state.member;
        member.phone = event.currentTarget.value;
        this.setState({ member });
    }

    editAddress = (event) => {
        const member = this.state.member;
        member.address = event.currentTarget.value;
        this.setState({ member });
    }

    editCity = (event) => {
        const member = this.state.member;
        member.city = event.currentTarget.value;
        this.setState({ member });
    }

    render = () => {
        return <div>
            <div>
                <div onClick={this.save}>sauvegarder</div>
                <div onClick={this.delete}>supprimer</div>
            </div>
            <div className="cardMember">
                <div>
                    <div className="pictContainer">
                        <img className="pictMember" src={this.props.member.picture} alt="moustache" />
                    </div>
                    <input type="file" ref={this.fileRef} onInput={this.upload} />
                </div>
                <div className="memberContainer">
                    <div>Poste :</div>
                    <input
                        className="roleMember lineMember"
                        defaultValue={this.props.member.role}
                        onChange={this.editRole}
                    />
                    <div>Nom :</div>
                    <input
                        className="lineMember"
                        defaultValue={this.props.member.name}
                        onChange={this.editName}
                    />
                    <div>Prénom :</div>
                    <input
                        className="lineMember"
                        defaultValue={this.props.member.firstName}
                        onChange={this.editFirstName}
                    />
                    <div>Téléphone mobile :</div>
                    <input
                        className="lineMember"
                        defaultValue={this.props.member.mobile}
                        onChange={this.editMobile}
                    />
                    <div>Téléphone fixe :</div>
                    <input
                        className="lineMember"
                        defaultValue={this.props.member.phone}
                        onChange={this.editPhone}
                    />
                    <div>Adresse :</div>
                    <input
                        className="lineMember"
                        defaultValue={this.props.member.address}
                        onChange={this.editAddress}
                    />
                    <div>Ville :</div>
                    <input
                        className="lineMember"
                        defaultValue={this.props.member.city}
                        onChange={this.editCity}
                    />
                </div>
            </div>
        </div>
    };
}