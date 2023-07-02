import Gallery from "./Gallery.js";
import "../service/react.js";
import "../service/reactDom.js";


class AllGalleries extends React.Component {

    Galleries = window['Galleries'];

    render = () => {
        return this.Galleries && this.Galleries.length > 0
            ? this.Galleries.map(gallery =>
                <Gallery gallery={gallery} key={gallery.id} />
            ).concat(this.Galleries.map((_, index) =>
                <div className="galleryErsatz" key={"void" + index}></div>
            ))
            : <div>Bientot, Vous trouverez ici les souvenirs de nos randos</div>;
    }
}

const galleries = React.createElement(AllGalleries);
const galleriesContainer = document.getElementById('galleries');
const galleriesDOM = ReactDOM.createRoot(galleriesContainer);
galleriesDOM.render(galleries);