class ResultBlock {
  constructor({ formData, res }) {
    this.searchPhrase = formData.what;
    this.location = formData.where;
    this.entryLevel = formData.entry;
    this.newerJobs = formData.newer;
    this.jobData = res
    this.jobsQueried = res.length;
  }

  getJobsQueried() {
    this.getJobsQueried = this.jobData.length();
  }

}

export default ResultBlock;