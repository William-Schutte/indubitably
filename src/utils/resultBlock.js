class ResultBlock {
  constructor({ formData, res, total, jobs }) {
    this.searchPhrase = formData.what;
    this.location = formData.where;
    this.entryLevel = formData.entry;
    this.newerJobs = formData.newer;
    this.jobData = jobs;
    this.totalJobs = total;
    this.jobsQueried = jobs.length;
  }

  getTopState() {
    let allStates = [];
    this.jobData.forEach((job) => {
      allStates.push(job.location.slice(-2));
    });

    allStates = allStates.sort();
    let topState = allStates[0];
    let max = allStates.lastIndexOf(topState) + 1;

    for (let i = max; i < allStates.length; i++) {
      let m = allStates.lastIndexOf(allStates[i]) - i + 1;
      if (m > max) {
        max = m;
        topState = allStates[i];
      }
    }

    let topPercent = 100 * (max) / this.jobsQueried;
    return `${topPercent}% in ${topState}`;
  }

  getTopCity() {
    let allCities = [];
    this.jobData.forEach((job) => {
      allCities.push(job.location);
    });

    allCities = allCities.sort();
    let topCity = allCities[0];
    let max = allCities.lastIndexOf(topCity) + 1;

    for (let i = max; i < allCities.length; i++) {
      let m = allCities.lastIndexOf(allCities[i]) - i + 1;
      if (m > max) {
        max = m;
        topCity = allCities[i];
      }
    }

    let topPercent = 100 * (max) / this.jobsQueried;
    return `${topPercent}% in ${topCity}`;
  }
}

export default ResultBlock;