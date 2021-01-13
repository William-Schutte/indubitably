const jobsStoreReducer = (allJobsState = 0, action) => {
  switch (action.type) {
    case "ADDJOBS":
      return allJobsState + 1;
    default:
      return allJobsState;
  }
}

export default jobsStoreReducer;
