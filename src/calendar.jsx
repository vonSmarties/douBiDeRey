import "../service/react.js";
import "../service/reactDom.js";
import ApiService from "../service/api.js";
import Event from "./Event.js";


export default class Calendar extends React.Component {

    className = ["eventOrange", "eventLight"];
    apiSvc = new ApiService();

    componentDidMount = () => {
        this.apiSvc.load("calendarListYear").then(listCalendar => {
            if (listCalendar) {
                this.setState({ listCalendar });
                this.loadCalendar(listCalendar[0]);
            } else {
                this.setState({ calendar: [], listCalendar: [] });
            }
        });
    }

    loadCalendar = (year) => {
        this.apiSvc.post("calendarYear", { year }).then(calendar =>
            this.setState({ calendar, selectedYear: year })
        );
    }

    render = () => {
        return this.state
            ? <div className="calendarContainer">
                <div className="claendarChoices">
                    <div>Année</div>
                    <select
                        onChange={(event) => this.loadCalendar(event.currentTarget.value)}
                        value={this.state.selectedYear}
                    >
                        {this.state.listCalendar &&
                            this.state.listCalendar.map(year =>
                                <option
                                    value={year}
                                    key={year}
                                >{year}</option>)
                        }
                    </select>
                </div>
                <div className="calendarWrapper">
                    <div className="calendarHeader">
                        <div className="eventDate">Date</div>
                        <div className="eventHour">Heure</div>
                        <div className="eventDistance">Distance/Durée</div>
                        <div className="eventPlace">Lieu de Départ</div>
                        <div className="eventClub">Club</div>
                    </div>
                    {this.state.calendar && this.state.calendar.map((event, index) => {
                        return <Event className={this.className[index % 2]} key={event.id} event={event}></Event>
                    })
                    }
                </div>
            </div>
            : "Chargement";
    };
}

const calendar = React.createElement(Calendar);
const calendarContainer = document.getElementById('calendar');
const calendarDOM = ReactDOM.createRoot(calendarContainer);
calendarDOM.render(calendar);