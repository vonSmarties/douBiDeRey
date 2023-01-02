import "../service/react";
import "../service/reactDom";
import "../service/quill";
import ApiService from "../service/api";


export default class EventEditor extends React.Component {

    month = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre"
    ];

    day = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
    ];

    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        let date;
        if (this.props.event.date) {
            date = new Date(this.props.event.date);
        } else {
            date = new Date(Date.now());
        }
        this.state = {
            date,
            length: this.props.event.length,
            place: this.props.event.place,
            club: this.props.event.club,
        }
    }

    editDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(this.state.date.getHours());
        date.setMinutes(this.state.date.getMinutes());
        this.setState({ date });
    }

    editHours = (hoursString) => {
        const hours = hoursString.split(":");
        const date = this.state.date;
        date.setHours(hours[0]);
        date.setMinutes(hours[1]);
        this.setState({ date });
    }

    save = () => {
        const body = {
            date: new Date(this.state.date),
            length: this.state.length,
            place: this.state.place,
            club: this.state.club
        };
        body.date.setHours(body.date.getHours() - body.date.getTimezoneOffset() / 60);
        if (this.props.event.id) {
            body.id = this.props.event.id;
            this.apiSvc.post("calendarUpdate", body).then(rtrn => {
                if (rtrn.update) {
                    body.date = this.state.date;
                    this.props.updateList(body);
                }
            });
        } else {
            this.apiSvc.post("calendarCreate", body).then(rtrn => {
                if (rtrn.create) {
                    body.id = rtrn.id;
                    body.date = this.state.date;
                    this.props.addInList(body);
                }
            });
        }
    }

    delete = () => {
        if (window.confirm("Confirmez vous la suppression de cet élément du calendrier ?"))
            this.apiSvc.post("calendarDelete", this.props.event).then(rtrn => {
                if (rtrn.delete)
                    this.props.delFromList(this.props.event);
            });
    }

    render = () => {
        return <div className={this.props.className}>
            <div>
                <div onClick={this.save}>sauvegarder</div>
                {this.props.event.id && <div onClick={this.delete}>supprimer</div>}
            </div>
            <div className="eventLine">
                <div className="itemEvent eventDate">
                    <div className="labelMobiel">Date: </div>
                    <input type="date" value={this.state.date.toISOString().split("T").shift()} onChange={(event) => this.editDate(event.currentTarget.value)} />
                </div>
                <div className="itemEvent eventHour">
                    <div className="labelMobiel">Heure : </div>
                    <input type="time" value={this.state.date.toTimeString().slice(0, 5)} onChange={(event) => this.editHours(event.currentTarget.value)} />
                </div>
            </div>
            <div className="eventLine">
                <div className="itemEvent eventDistance">
                    <div className="labelMobiel">Distance/Durée : </div>
                    <input type="text" defaultValue={this.props.event.length} onChange={(event) => this.setState({ length: event.currentTarget.value })} />
                </div>
                <div className="itemEvent eventPlace">
                    <div className="labelMobiel">Lieu : </div>
                    <input type="text" defaultValue={this.props.event.place} onChange={(event) => this.setState({ place: event.currentTarget.value })} />
                </div>
            </div>
            <div className="eventClub">
                <div className="labelMobiel">Club : </div>
                <input type="text" defaultValue={this.props.event.club} onChange={(event) => this.setState({ club: event.currentTarget.value })} />
            </div>
        </div >;
    };
}