import ApiService from "../service/api";
import Gallery from "./Gallery";
import "../service/react";
import "../service/reactDom";


class AllGalleries extends React.Component {

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.load("galleryAll").then(Galleries => this.setState({ Galleries }));

    }

    render = () => {
        return this.state
            ? this.state.Galleries.map(gallery =>
                <Gallery gallery={gallery} key={gallery.id} />
            ).concat(this.state.Galleries.map((_,index) =>
                <div className="galleryErsatz" key={"void" + index}></div>
            ))
            : <div>chargement</div>
    };
}

const galleries = React.createElement(AllGalleries);
const galleriesContainer = document.getElementById('galleries');
const galleriesDOM = ReactDOM.createRoot(galleriesContainer);
galleriesDOM.render(galleries);