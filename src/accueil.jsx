import ApiService from "../service/api";
import Gallery from "./Gallery";
import Info from "./Info";
import "../service/react";
import "../service/reactDom";


class LastInfo extends React.Component {

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.load("infoLast").then(info => this.setState({ info }));

    }

    render = () => {
        return this.state
            ? <Info info={this.state.info} />
            : <div>chargement</div>
    };
}

const info = React.createElement(LastInfo);
const infoContainer = document.getElementById('info');
const infoDOM = ReactDOM.createRoot(infoContainer);
infoDOM.render(info);


class LastGallery extends React.Component {

    componentDidMount = () => {
        const apiSvc = new ApiService();
        apiSvc.load("galleryLast").then(gallery =>
            apiSvc.post("imageGallery", { gallery }).then(images =>
                this.setState({ gallery, images })
            )
        );
    }

    render = () => {
        return this.state
            ? <Gallery gallery={this.state.gallery} images={this.state.images}/>
            : <div>chargement</div>
    };
}

const gallery = React.createElement(LastGallery);
const galleryContainer = document.getElementById('gallery');
const galleryDOM = ReactDOM.createRoot(galleryContainer);
galleryDOM.render(gallery);