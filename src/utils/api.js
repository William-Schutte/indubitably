class Api {
    constructor(options) {
        this.options = options;
    }

    _generateUrl(data) {
        const { what, where, entry, newer } = data;
        let uri = encodeURI(what);
        if (where !== "") {
            uri += ("&l=" + encodeURI(where) + "&radius=25");
        }
        if (entry) {
            uri += "&explvl=entry_level"
        }
        if (newer) {
            uri += "&fromage=21";
        }
        return this.options.baseIndeedUrl + uri + this.options.baseIndeedParams;
    }

    searchJobs(data) {
        const searchUrlwParams = this._generateUrl(data);
        return fetch(this.options.searchApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: searchUrlwParams }),
        })
            .then(res => {
                if (res.status === 202) {
                    return res.json();
                } else {
                    return { 'searchStatus': 'Failed' }
                }
            })
    }

    // This is an auto repeating promise that will loop until it resolves correctly
    // Incorporate a max timeout soon... 
    // getSearchedJobs(jobId) {
    //     return new Promise(function repeat(resolve, reject) {
    //         fetch("http://api.ws-indubitably.com/data/" + jobId, {
    //             method: 'GET',
    //         }).then((res) => {
    //             if (res.status === 200) {
    //                 resolve(res.json());
    //             } else {
    //                 setTimeout(() => {repeat(resolve, reject)}, 3000)
    //                 }
    //             });
    //     });
    // }
}

// Current Indeed URL Breakdown
// https://www.indeed.com/jobs?
// as_and=          (search words)
// &as_phr          (exact phrase)
// &as_any          (at least one sw)
// &as_not          (exclude sw)
// &as_ttl          (sw in title)
// &as_cmp          (company)
// &jt=all          (job types)
// &st              (all sources)
// &salary          (salary estimate)
// &radius=25       (radius)
// &l=atlanta       (location)
// &fromage=8       (days posted ago)
// &limit=50        (per page, max=50)
// &sort=date       (sort by age)
// &psf=advsrch
// &from=advancedsearch
// &vjk=7354584594d2ec91

// &explvl=entry_level
// &explvl=mid_level
// &explvl=senior_level

// &as_phr&as_any&as_not&as_ttl&as_cmp&jt=all&st&salary&radius=100&l=atlanta&fromage=15&limit=50&sort=date&psf=advsrch&from=advancedsearch
// https://www.indeed.com/jobs?q=frontend%20developer%20-senior%2C%20-sr&psf=advsrch&from=advancedsearch&explvl=entry_level&limit=50&fromage=15&sort=date
const api = new Api({
    baseIndeedUrl: "https://www.indeed.com/jobs?as_and=",
    baseIndeedParams: "&limit=50&sort=date&psf=advsrch&from=advancedsearch",
    searchApiUrl: "http://localhost:8000/search",
    getUrl: "http://api.ws-indubitably.com/data/",
});

export default api;