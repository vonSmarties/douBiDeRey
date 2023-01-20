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
                } else {
                    window.alert("L'image n'a pas été modifié");
                }
            });
        } else {
            this.apiSvc.postFormData("memberImageCreate", formData).then(rtrn => {
                if (rtrn.create) {
                    const member = this.state.member;
                    member.picture = rtrn.file;
                    this.setState({ member });
                    this.props.updateList(member);
                } else {
                    window.alert("L'image n'a pas été chargé");
                }
            });
        }
    }

    save = () => {
        const member = this.state.member;
        this.apiSvc.post("memberUpdate", member).then(rtrn => {
            if (rtrn.update) {
                this.props.updateList(member);
                this.props.close();
            } else {
                window.alert("Echec de l'édition");
            }
        });
    }

    delete = () => {
        if (window.confirm("Confirmez vous la suppression du membre du bureau ?"))
            this.apiSvc.post("memberDelete", this.props.member).then(rtrn => {
                if (rtrn.delete) {
                    this.props.delFromList(this.props.member);
                } else {
                    window.alert("Echec de la suppression");
                }
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

    editEmail = (event) => {
        const member = this.state.member;
        member.email = event.currentTarget.value;
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

    openInputFile = () => {
        this.fileRef.current.click()
    }

    render = () => {
        return <div className={this.props.className}>
            <div className="modalHeader">
                <div
                    className="modalCloseContainer"
                    onClick={this.props.close}
                >
                    <div className="modalClose1"></div>
                    <div className="modalClose2"></div>
                </div>
            </div>
            <div className="cardMember">
                <img className="pictMember" src={this.props.member.picture} alt="Pas d'image" />
                <div className="memberContainer">
                    <div className="lineMember">
                        <div onClick={this.openInputFile} className="editButtonLight leftButton">Modifier la photo</div>
                        <input className="addFile" type="file" ref={this.fileRef} onInput={this.upload} />
                    </div>
                    <div className="lineMember">
                        <div>Poste :</div>
                        <input
                            defaultValue={this.props.member.role}
                            onChange={this.editRole}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Nom :</div>
                        <input
                            defaultValue={this.props.member.name}
                            onChange={this.editName}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Prénom :</div>
                        <input
                            defaultValue={this.props.member.firstName}
                            onChange={this.editFirstName}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Email :</div>
                        <input
                            defaultValue={this.props.member.email}
                            onChange={this.editEmail}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Téléphone mobile :</div>
                        <input
                            defaultValue={this.props.member.mobile}
                            onChange={this.editMobile}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Téléphone fixe :</div>
                        <input
                            defaultValue={this.props.member.phone}
                            onChange={this.editPhone}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Adresse :</div>
                        <input
                            defaultValue={this.props.member.address}
                            onChange={this.editAddress}
                        />
                    </div>
                    <div className="lineMember">
                        <div>Ville :</div>
                        <input
                            defaultValue={this.props.member.city}
                            onChange={this.editCity}
                        />
                    </div>
                </div>
            </div>
            <div className="bottomRow bottomModal">
                <div onClick={this.save} className="editButtonLight">sauvegarder</div>
                <div onClick={this.delete} className="editButtonLight">supprimer</div>
            </div>
        </div>
    };
}