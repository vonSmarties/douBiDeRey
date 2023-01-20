class ApiService {
    http = "http://192.168.174.110/doubiderey/api/";
    ext = ".php";
    logOutEvent = new Event("logOutEvent");

    load = (route) => {
        return fetch(this.http + route + this.ext).then(rtrn => rtrn.json());
    }

    post = (route, body) => {
        body.magicalUnicornToken = localStorage.getItem('magicalUnicornToken');
        return fetch(this.http + route + this.ext, { method: "POST", body: JSON.stringify(body) })
            .then(rtrn => rtrn.json())
            .then(rtrn => {
                if (rtrn.unicorn)
                    document.dispatchEvent(this.logOutEvent);
                return rtrn;
            });
    }

    postFormData = (route, body) => {
        body.append("magicalUnicornToken", localStorage.getItem('magicalUnicornToken'));
        return fetch(this.http + route + this.ext, { method: "POST", body: body })
            .then(rtrn => rtrn.json())
            .then(rtrn => {
                if (rtrn.unicorn)
                    document.dispatchEvent(this.logOutEvent);
                return rtrn;
            });;
    }

    log = (password) => {
        return fetch(this.http + "passwordCheck" + this.ext, { method: "POST", body: JSON.stringify({ password }) })
            .then(rtrn => rtrn.json())
            .then(rtrn => {
                if (rtrn.check)
                    localStorage.setItem('magicalUnicornToken', rtrn.magicalUnicornToken);
                return rtrn;
            });
    }

    logOut = () => localStorage.removeItem('magicalUnicornToken');

    downloadGallery = (title, body) => {
        return fetch(this.http + 'galleryDownload' + this.ext, { method: "POST", body: JSON.stringify(body) })
            .then(rtrn => rtrn.blob()).then(rtrn => {
                this.download(title, rtrn);
            });
    }

    download = (filename, data) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            const element = document.createElement('a');
            element.setAttribute('href', reader.result);
            element.setAttribute('download', filename + '.zip');
            element.click();
        }, { once: true });

        reader.readAsDataURL(data);
    }
}
export default ApiService; 