class ApiService {
    http = "http://localhost/doubiderey/api/";
    ext = ".php"

    load = (route) => {
        return fetch(this.http + route + this.ext).then(rtrn => rtrn.json());
    }

    post = (route, body) => {
        return fetch(this.http + route + this.ext, { method: "POST", body: JSON.stringify(body) }).then(rtrn => rtrn.json());
    }

    postRawBody = (route, body) => {
        return fetch(this.http + route + this.ext, { method: "POST", body:body }).then(rtrn => rtrn.json());
    }
}
export default ApiService; 