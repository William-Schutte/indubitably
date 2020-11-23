let test = "https://www.indeed.com/jobs?q=javascript&explvl=entry_level&sort=date&limit=50&fromage=15&radius=25&start=50";
let test2 = "https://www.indeed.com/jobs?q=react%20engineer&l=Portland%2C%20OR&radius=25&sort=date";
// Search text encoded
let searchText = encodeURI("Cool job");

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
        let searchParams = this.generateUrl(data);
        return fetch(this.options.proxyUrl + this.options.baseUrl + searchParams + this.options.baseParams)
            .then(res => {
                if (res.status === 200) {
                    return res.text();
                }
            }).then((res) => {
                let rawData = res.slice(res.lastIndexOf('searchCountPages'));
                rawData = res.split("jobsearch-SerpJobCard unifiedRow");
                return rawData;
            })
    }
}

const api = new Api({ 
    baseUrl: "https://www.indeed.com/jobs?q=", 
    baseParams: "&sort=date&limit=50",
    proxyUrl: "https://cors-anywhere.herokuapp.com/"
});

export default api;