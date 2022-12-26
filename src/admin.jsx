import ApiService from "../service/api";
import GalleryEditor from "./galleryEditor";
import "../service/react";
import "../service/reactDom";
import InfoEditor from "./infoEditor";
import Info from "./info";


class Admin extends React.Component {

    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            galleriesOpen: false,
            galleriesOpen: false,
            galleryOpen: [],
            infoOpen: [],
            eventOpen: [],
            titleNewGallery: ''
        }
    }

    componentDidMount = () => {
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
        if (!this.state.calendar)
            this.apiSvc.load("calendarListYear").then(calendar => this.setState({ calendar }));
        this.setState({ calendarOpen: !this.state.calendarOpen });
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

    addInfo = (info) => {
        const informations = this.state.informations || [];
        informations.unshift(info);
        this.setState({ informations, openAddInfo:false });
    }

    openEvent = (event) => {
        const eventOpen = this.state.eventOpen;
        eventOpen[event.id] = !eventOpen[event.id];
        this.setState({ eventOpen });
    }

    render = () => {
        return <div>
            <div>
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
                                                <input type="text" value={this.state.titleNewGallery} onChange={(event) => this.setState({ titleNewGallery: event.currentTarget.value })} onKeyUp={(event) => event.key == "Enter" && this.newGallery()} />
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
                                                    <GalleryEditor gallery={gallery}></GalleryEditor>
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
                                            <InfoEditor info={{}} updateList={this.addInfo}></InfoEditor>
                                            <div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.informations.map(info => {
                                            return <div key={info.id}>
                                                <Info onClick={() => this.openInfo(info)} info={info}></Info>
                                                {this.state.infoOpen[info.id] && <div>
                                                    <InfoEditor info={info}></InfoEditor>
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
                <div onClick={this.openInformations}>Calendrier</div>
                {
                    this.state.calendarOpen && <div>
                        <select>

                        </select>
                        {
                            this.state.calendar
                                ? <div>
                                    <div onClick={() => this.setState({ openAddcalendar: true })}>Ajouter une nouvelle évènement</div>
                                    {
                                        this.state.openAddcalendar && <div>
                                            <Event event={{}} updateList={this.addEvent}></Event>
                                            <div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.calendar.map(event => {
                                            return <div key={event.id}>
                                                <Event event={event} onClick={() => this.openEvent(event)}></Event>
                                                {this.state.eventOpen[event.id] && <div>
                                                    <EventEditor event={event}></EventEditor>
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
        </div>
    };
}

const admin = React.createElement(Admin);
const adminContainer = document.getElementById('admin');
const adminDOM = ReactDOM.createRoot(adminContainer);
adminDOM.render(admin);