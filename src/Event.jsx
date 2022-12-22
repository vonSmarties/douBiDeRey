import "../service/react";
import "../service/reactDom";

export default class Event extends React.Component {

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

    render = () => {
        const date = new Date(this.props.event.date);
        return <div className={"event " + this.props.className}>
            <div className="eventLine">
                <div className="itemEvent eventDate">
                    <div className="labelMobiel">Date : </div>
                    <div>{this.day[date.getDay()]} {date.getDate()} {this.month[date.getMonth()]}</div>
                </div>
                <div className="itemEvent eventHour">
                    <div className="labelMobiel">Heure : </div>
                    <div>{date.getHours()}h {date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes()}</div>
                </div>
            </div>
            <div className="eventLine">
                <div className="itemEvent eventDistance">
                    <div className="labelMobiel">Distance/Durée : </div>
                    <div title="Distance">{this.props.event.length}</div>
                </div>
                <div className="itemEvent eventPlace">
                    <div className="labelMobiel">Lieu : </div>
                    <div title="Lieu de départ">{this.props.event.place}</div>
                </div>
            </div>
            <div className="eventClub">
                <div className="labelMobiel">Club : </div>
                <div title="Club">{this.props.event.club}</div>
            </div>
        </div >;
    };
}