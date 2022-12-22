import ApiService from "../service/api";
import GalleryEditor from "./galleryEditor";
import "../service/react";
import "../service/reactDom";


class Admin extends React.Component {

    apiSvc = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            galleriesOpen: false,
            galleryOpen: []
        }
    }

    componentDidMount = () => {
    }

    openGalleries = () => {
        if (!this.state.galleries)
            this.apiSvc.load("galleryAll").then(galleries => this.setState({ galleries }));
        this.setState({ galleriesOpen: true });
    }

    openGallery = (gallery) => {
        const galleryOpen = this.state.galleryOpen || [];
        galleryOpen[gallery.id] = true;
        this.setState({ galleryOpen });
    }

    render = () => {
        return <div>
            <div>
                <div onClick={this.openGalleries}>galleries</div>
                {
                    this.state.galleriesOpen && <div>
                        {
                            this.state.galleries
                                ? this.state.galleries.map(gallery => {
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