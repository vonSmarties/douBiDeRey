class ApiService {
    http = "http://localhost/doubiderey/api/";
    ext = ".php";
    logOut = new Event("logOut");

    load = (route) => {
        return fetch(this.http + route + this.ext).then(rtrn => rtrn.json());
    }

    post = (route, body) => {
        body.magicalUnicornToken = localStorage.getItem('magicalUnicornToken');
        return fetch(this.http + route + this.ext, { method: "POST", body: JSON.stringify(body) })
            .then(rtrn => rtrn.json())
            .then(rtrn => {
                if (rtrn.unicorn)
                    document.dispatchEvent(this.logOut);
                return rtrn;
            });
    }

    postFormData = (route, body) => {
        body.append("magicalUnicornToken", localStorage.getItem('magicalUnicornToken'));
        return fetch(this.http + route + this.ext, { method: "POST", body: body })
            .then(rtrn => rtrn.json())
            .then(rtrn => {
                if (rtrn.unicorn)
                    document.dispatchEvent(this.logOut);
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
}
export default ApiService; 