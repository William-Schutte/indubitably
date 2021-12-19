class ResultBlock {
    constructor({ formData, total, jobs }) {
        this.formData = formData;
        this.allJobsData = jobs;
        this.totalJobsCount = total;
        this.jobsQueried = jobs.length;
        // this.blockId = blockId;
    }

    getRemotePercent() {
        let remoteCount = 0;
        this.allJobsData.forEach((job) => {
            if (job.jobLocation.remote) {
                remoteCount++;
            }
        });
        const percent = remoteCount / this.jobsQueried * 100;
        return `${percent.toFixed(1)}% remote`;
    }

    getTopState() {
        const allStates = {};
        this.allJobsData.forEach((job) => {
            const state = job.jobLocation.state;
            if (state) {
                if (allStates[state]) {
                    allStates[state] += 1;
                } else {
                    allStates[state] = 1;
                }
            }
        });

        let maxVal = 0;
        let maxState = "";
        for (const [key, value] of Object.entries(allStates)) {
            if (value > maxVal) {
                maxVal = value;
                maxState = key;
            }
        }

        const topPercent = 100 * (maxVal) / this.jobsQueried;
        return `${topPercent.toFixed(1)}% in ${maxState}`;
    }

    getTopCity() {
        const allCities = {};
        this.allJobsData.forEach((job) => {
            const city = job.jobLocation.city;
            if (city) {
                if (allCities[city]) {
                    allCities[city] += 1;
                } else {
                    allCities[city] = 1
                }
            }
        });

        let maxVal = 0;
        let maxCity = "";
        for (const [key, value] of Object.entries(allCities)) {
            if (value > maxVal) {
                maxVal = value;
                maxCity = key;
            }
        }

        const topPercent = 100 * (maxVal) / this.jobsQueried;
        return `${topPercent.toFixed(1)}% in ${maxCity}`;
    }

    getAllCoords(jobs) {
        return jobs.map((job) => {
            const coordsArray = job.coords;

            if (coordsArray === undefined) {
                return job;
            }
            return { ...job, long: parseFloat(coordsArray[3]), lat: parseFloat(coordsArray[2]) };
        })
    }
}

export default ResultBlock;