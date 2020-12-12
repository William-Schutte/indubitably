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

    searchJobs(data) {
        let searchUrl = this.options.baseUrl + this.generateUrl(data) + this.options.baseParams;
        return fetch(this.options.searchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: searchUrl }),
        })
            .then(res => {
                if (res.status === 202) {
                    return res.json();
                }
            })
    }

    // This is an auto repeating promise that will loop until it resolves correctly
    // Incorporate a max timeout soon... 
    getSearchedJobs(jobId) {
        return new Promise(function repeat(resolve, reject) {
            fetch("http://localhost:5000/data/" + jobId, {
                method: 'GET',
            }).then((res) => {
                if (res.status === 200) {
                    resolve(res.json());
                } else {
                    setTimeout(() => {repeat(resolve, reject)}, 3000)
                    }
                });
        });
    }
}

const api = new Api({
    baseUrl: "https://www.indeed.com/jobs?q=",
    baseParams: "&sort=date&limit=50",
    searchUrl: "http://localhost:5000/search",
    getUrl: "http://localhost:5000/data/",
});

export default api;