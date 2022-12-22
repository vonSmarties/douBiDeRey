import "../service/react";
import "../service/reactDom";
import ApiService from "../service/api";
import Event from "./Event";


export default class Calendar extends React.Component {

    className = ["eventOrange", "eventLight"];

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.post("calendarYear", { year: 2022 }).then(calendar =>
            this.setState({ calendar })
        );
    }

    render = () => {
        return <div className="calendarContainer">
            <div className="calendarHeader">
                <div className="eventDate">Date</div>
                <div className="eventHour">Heure</div>
                <div className="eventDistance">Distance/Durée</div>
                <div className="eventPlace">Lieu de Départ</div>
                <div className="eventClub">Club</div>
            </div>
            {
                this.state && this.state.calendar.map((event, index) => {
                    return <Event className={this.className[index % 2]} key={event.id} event={event}></Event>
                })
            }
        </div>
    };
}

const calendar = React.createElement(Calendar);
const calendarContainer = document.getElementById('calendar');
const calendarDOM = ReactDOM.createRoot(calendarContainer);
calendarDOM.render(calendar);