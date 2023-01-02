import ApiService from "../service/api";
import GalleryEditor from "./galleryEditor";
import "../service/react";
import "../service/reactDom";
import InfoEditor from "./infoEditor";
import Info from "./info";
import Event from "./Event";
import EventEditor from "./EventEditor";
import Member from "./Member";
import MemberEditor from "./MemberEditor";
import Logger from "./Logger";



class Admin extends React.Component {

    apiSvc = new ApiService();
    memberOnMove;

    constructor(props) {
        super(props);
        this.state = {
            galleryOpen: [],
            infoOpen: [],
            eventOpen: [],
            memberOpen: [],
            titleNewGallery: '',
            selectedYear: 1958,
            isLogged: false
        }
    }

    componentDidMount = () => {
        this.apiSvc.post("logged", {}).then(rtrn => {
            if (rtrn.check)
                this.setState({ isLogged: true });
        });
    }

    openGalleries = () => {
        if (!this.state.galleries)
            this.apiSvc.load("galleryAll").then(galleries => this.setState({ galleries }));
        this.setState({ galleriesOpen: !this.state.galleriesOpen });
    }

    openInformations = () => {
        if (!this.state.informations)
            this.apiSvc.load("infoAll").then(informations => this.setState({ informations }));
        this.setState({ informationsOpen: !this.state.informationsOpen });
    }

    openCalendar = () => {
        if (!this.state.listCalendar)
            this.apiSvc.load("calendarListYear").then(listCalendar => {
                if (listCalendar) {
                    this.setState({ listCalendar });
                    this.loadCalendar(listCalendar[0]);
                } else {
                    this.setState({ calendar: [], listCalendar: [] });
                }
            });
        this.setState({ calendarOpen: !this.state.calendarOpen });
    }

    loadCalendar = (year) => {
        this.apiSvc.post("calendarYear", { year }).then(calendar =>
            this.setState({ calendar, selectedYear: year })
        );
    }

    openGallery = (gallery) => {
        const galleryOpen = this.state.galleryOpen;
        galleryOpen[gallery.id] = !galleryOpen[gallery.id];
        this.setState({ galleryOpen });
    }

    openInfo = (info) => {
        const infoOpen = this.state.infoOpen;
        infoOpen[info.id] = !infoOpen[info.id];
        this.setState({ infoOpen });
    }

    newGallery = () => {
        const newGallery = { title: this.state.titleNewGallery };
        this.apiSvc.post("galleryCreate", newGallery).then(rtrn => {
            if (rtrn.create) {
                newGallery.id = rtrn.id;
                const galleries = this.state.galleries;
                galleries.unshift(newGallery);
                const galleryOpen = [];
                galleryOpen[newGallery.id] = true;
                this.setState({ galleries, titleNewGallery: '', openAddGallery: false, galleryOpen })
            }
        });
    }

    deleteGalleries = (gallery) => {
        const galleries = this.state.galleries;
        galleries.splice(galleries.indexOf(gallery), 1);
        this.setState({ galleries });
    }

    updateGalleries = (gallery) => {
        const galleries = this.state.galleries;;
        if (galleries.indexOf(gallery) > -1) {
            this.setState({ galleries });
        }
    }

    deleteGalleries = (gallery) => {
        const galleries = this.state.galleries;
        galleries.splice(galleries.indexOf(gallery), 1);
        this.setState({ galleries });
    }

    updateGalleries = (gallery) => {
        const galleries = this.state.galleries;;
        if (galleries.indexOf(gallery)) {
            this.setState({ galleries });
        }
    }

    addInfo = (info) => {
        const informations = this.state.informations || [];
        informations.unshift(info);
        this.setState({ informations, openAddInfo: false });
    }

    deleteInfo = (info) => {
        const informations = this.state.informations;
        informations.splice(informations.indexOf(info), 1);
        this.setState({ informations });
    }

    updateInfo = (info) => {
        const informations = this.state.informations;
        const index = informations.findIndex(oldInfo => oldInfo.id == info.id);
        if (index > -1) {
            informations[index].delta = info.delta;
            this.setState({ informations });
        }
    }

    openEvent = (event) => {
        const eventOpen = this.state.eventOpen;
        eventOpen[event.id] = !eventOpen[event.id];
        this.setState({ eventOpen });
    }

    addEvent = (evnet) => {
        const calendar = this.state.calendar || [];
        const dateEvent = new Date(evnet.date);
        if (calendar[0] && dateEvent.getFullYear() == (new Date(calendar[0].date)).getFullYear()) {
            this.setState({
                calendar: this.orderEvents(calendar, evnet),
                openAddcalendar: false
            });
        } else {
            const listCalendar = this.state.listCalendar;
            this.loadCalendar(dateEvent.getFullYear());
            if (listCalendar && listCalendar.indexOf(dateEvent.getFullYear()) < 0)
                listCalendar.unshift(dateEvent.getFullYear());
            this.setState({
                listCalendar,
                openAddcalendar: false
            });
        }
    }

    orderEvents = (calendar, ev) => {
        if (ev)
            calendar.push(ev);
        calendar.sort((ev1, ev2) => {
            const date1 = new Date(ev1.date);
            const date2 = new Date(ev2.date);
            return date1.valueOf() - date2.valueOf();
        });
        return calendar;
    }

    deleteEvent = (ev) => {
        const calendar = this.state.calendar;
        calendar.splice(calendar.indexOf(ev), 1);
        if (calendar.length > 0) {
            this.setState({ calendar });
        } else {
            const year = (new Date(ev.date)).getFullYear();
            console.log(calendar.indexOf(year))
            this.state.listCalendar.splice(this.state.listCalendar.indexOf(year), 1);
            this.loadCalendar(this.state.listCalendar[0]);
        }
    }

    updateEvent = (ev) => {
        const calendar = this.state.calendar;
        const index = calendar.findIndex(oldev => oldev.id == ev.id);
        const year = (new Date(ev.date)).getFullYear();
        if (year == this.state.selectedYear) {
            calendar[index] = ev;
            this.setState({ calendar });
        } else {
            this.loadCalendar(year);
        }
    }

    openMembers = () => {
        if (!this.state.members)
            this.apiSvc.load("memberAll").then(members => this.setState({ members }));
        this.setState({ membersOpen: !this.state.membersOpen });
    }

    openMember = (member) => {
        const memberOpen = this.state.memberOpen;
        memberOpen[member.id] = !memberOpen[member.id];
        this.setState({ memberOpen });
    }

    updateMember = (member) => {
        const members = this.state.members;
        const index = members.indexOf(member);
        if (index > -1) {
            this.setState({ members });
        }
    }

    deleteMember = (member) => {
        const members = this.state.members;
        members.splice(members.indexOf(member), 1);
        this.setState({ members });
    }

    addMember = () => {
        this.apiSvc.post('memberCreate', { name: "nouveau membre", rang: this.state.members.length }).then(rtrn => {
            if (rtrn.create) {
                const members = this.state.members;
                const memberOpen = this.state.memberOpen;
                memberOpen[rtrn.id] = true;
                members.push({ id: rtrn.id });
                this.setState({ members, memberOpen });
            }
        })
    }

    newMemberOrder = (newIndex) => {
        const members = this.state.members;
        const memberMoved = members.splice(this.memberIndexOnMove, 1).pop();
        members.splice(newIndex, 0, memberMoved);
        this.setState({ members });
        members.forEach((member, index) => member.rang = index);
        this.apiSvc.post('memberOrder', members).then(rtrn => {

        });
    }

    render = () => {
        return this.state.isLogged
            ? <div>
                <div onClick={this.openGalleries}>Galeries</div>
                {
                    this.state.galleriesOpen && <div>
                        {
                            this.state.galleries
                                ? <div>
                                    <div onClick={() => this.setState({ openAddGallery: true })}>Ajouter une nouvelle Galerie</div>
                                    {
                                        this.state.openAddGallery && <div>
                                            <div>
                                                <input
                                                    type="text"
                                                    onChange={(event) => this.setState({ titleNewGallery: event.currentTarget.value })}
                                                    onKeyUp={(event) => event.key == "Enter" && this.newGallery()}
                                                />
                                                <div onClick={this.newGallery}>créer</div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.galleries.map(gallery => {
                                            return <div key={gallery.id}>
                                                <div onClick={() => this.openGallery(gallery)}>
                                                    {gallery.title}
                                                </div>
                                                {this.state.galleryOpen[gallery.id] && <div>
                                                    <GalleryEditor
                                                        updateList={this.updateGalleries}
                                                        delFromList={this.deleteGalleries}
                                                        gallery={gallery}
                                                    ></GalleryEditor>
                                                    <div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                : "chargement"
                        }
                    </div>
                }
                <div onClick={this.openInformations}>Informations</div>
                {
                    this.state.informationsOpen && <div>
                        {
                            this.state.informations
                                ? <div>
                                    <div onClick={() => this.setState({ openAddInfo: true })}>Ajouter une nouvelle information</div>
                                    {
                                        this.state.openAddInfo && <div>
                                            <InfoEditor
                                                info={{}}
                                                addInList={this.addInfo}
                                            ></InfoEditor>
                                            <div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.informations.map(info => {
                                            return <div key={info.id}>
                                                <Info onClick={() => this.openInfo(info)} info={info}></Info>
                                                {this.state.infoOpen[info.id] && <div>
                                                    <InfoEditor
                                                        info={info}
                                                        updateList={this.updateInfo}
                                                        delFromList={this.deleteInfo}
                                                    ></InfoEditor>
                                                    <div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                : "chargement"
                        }
                    </div>
                }
                <div onClick={this.openCalendar}>Calendrier</div>
                {
                    this.state.calendarOpen && <div>
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
                        {
                            this.state.calendar
                                ? <div>
                                    <div onClick={() => this.setState({ openAddcalendar: true })}>Ajouter une nouvelle évènement</div>
                                    {
                                        this.state.openAddcalendar && <div>
                                            <EventEditor
                                                event={{}}
                                                addInList={this.addEvent}
                                            ></EventEditor>
                                            <div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.calendar.map(event => {
                                            return <div key={event.id}>
                                                <Event
                                                    event={event}
                                                    onClick={() => this.openEvent(event)}
                                                ></Event>
                                                {this.state.eventOpen[event.id] && <div>
                                                    <EventEditor
                                                        event={event}
                                                        updateList={this.updateEvent}
                                                        delFromList={this.deleteEvent}
                                                    ></EventEditor>
                                                    <div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                : "chargement"
                        }
                    </div>
                }
                <div onClick={this.openMembers}>Bureau</div>
                {
                    this.state.membersOpen && <div>
                        {
                            this.state.members
                                ? <div>
                                    <div onClick={this.addMember}>Ajouter une nouveau membre</div>
                                    {
                                        this.state.members.map((member, index) => {
                                            return <div key={member.id} onDragOver={(ev) => ev.preventDefault()} onDropCapture={() => this.newMemberOrder(index)}>
                                                <Member
                                                    member={member}
                                                    onClick={() => this.openMember(member)}
                                                    draggable={true}
                                                    onDragStart={() => { console.log(index); this.memberIndexOnMove = index }}
                                                ></Member>
                                                {this.state.memberOpen[member.id] && <div>
                                                    <MemberEditor
                                                        member={member}
                                                        updateList={this.updateMember}
                                                        delFromList={this.deleteMember}
                                                    ></MemberEditor>
                                                    <div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                : "chargement"
                        }
                    </div>
                }
            </div>
            : <Logger login={() => this.setState({ isLogged: true })}></Logger>
    };
}

const admin = React.createElement(Admin);
const adminContainer = document.getElementById('admin');
const adminDOM = ReactDOM.createRoot(adminContainer);
adminDOM.render(admin);