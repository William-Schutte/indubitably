let test = "https://www.indeed.com/jobs?q=javascript&explvl=entry_level&sort=date&limit=50&fromage=15&radius=25&start=50";
let test2 = "https://www.indeed.com/jobs?q=react%20engineer&l=Portland%2C%20OR&radius=25&sort=date";

class Api {
    constructor(options) {
        this.options = options;
    }

    generateUrl(data) {
        const { what, where, entry, newer } = data;
        let uri = encodeURI(what); 
        if (where !== "") {
            uri += ("&l=" + encodeURI(where) + "&radius=25");
        }
        if (entry) {
            uri += "&explvl=entry_level"
        }
        if (newer) {
            uri += "&fromage=15";
        }
        return uri;
    }

    getJobs(data) {
        let searchUrl = this.options.baseUrl + this.generateUrl(data) + this.options.baseParams;
        return fetch(this.options.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: searchUrl }),
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
    }
}

const api = new Api({ 
    baseUrl: "https://www.indeed.com/jobs?q=", 
    baseParams: "&sort=date&limit=50",
    apiUrl: "http://localhost:5000/search"
});

export default api;