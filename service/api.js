class ApiService {
    // http = "https://www.marcheurs-dou-bi-de-rey.fr/api/";
    http = "http://localhost/doubiderey/api/";
    ext = ".php";
    logOutEvent = new Event("logOutEvent");
    header = new Headers({
        "Access-Control-Allow-Origin": this.http
    });

    load = (route) => {
        return fetch(this.http + route + this.ext, { headers: this.header }).then(rtrn => rtrn.json());
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

}
export default ApiService; 