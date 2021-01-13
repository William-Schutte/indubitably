// ACTIONS, describe change functions to state

const addJobs = (newJobs) => {
  return {
    type: 'ADDJOBS',
    payload: newJobs,
  }
}

export default addJobs;
