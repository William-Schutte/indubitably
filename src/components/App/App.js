import React from 'react';
import { createStore } from 'redux';
import allReducers from '../../reducers';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/api';
import ResultBlock from '../../utils/resultBlock';
import Footer from '../Footer/Footer';
import './App.css'

import { coolList } from '../../utils/selectcities';

// STORE, the global state for Redux
const jobsStore = createStore(allReducers);

// DISPATCH, sends changes to STORE
// jobsStore.dispatch(addJobs());

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeJobs: [],
      resultBlocks: [],
      loading: false,
      citiesData: coolList,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getJobMainCity = this.getJobMainCity.bind(this);
    this.createJobBlock = this.createJobBlock.bind(this);
    this.handleSortData = this.handleSortData.bind(this);
    this.handleResetData = this.handleResetData.bind(this);
  }

  handleSearch(data) {
    this.setState({ loading: true });

    api.searchJobs(data)
      .then((res) => {
        const blockId = res.jobId;
        api.getSearchedJobs(blockId)
          .then((res) => {
            this.createJobBlock({ formData: data, res, blockId });
          })
      });
  }

  getJobMainCity(job) {
    // Take a job and its coords [City, ST, Lat, Long]
    let jobLat = job[2];
    let jobLong = job[3];

    // Compare to each coolCity [City, ST, Lat, Long, Radius]
    for (let i = 0; i < coolList.length; i++) {
      let cityLat = coolList[i][2];
      let cityLong = coolList[i][3];
      let r = coolList[i][4] / 60;
      let deltaLat = Math.abs(jobLat - cityLat);
      let deltaLong = Math.abs(jobLong - cityLong);

      if ((deltaLat < r) && (deltaLong < r)) {
        if (Math.sqrt(deltaLat * deltaLat + deltaLong * deltaLong) < (r * r)) {
          // If the city 
          let newCityCount = this.state.citiesData;
          newCityCount[i][5].count += 1;
          this.setState({ citiesData: newCityCount });

          return coolList[i].slice(0,4);
        }
      }
    }

    return job;
  }

  createJobBlock({ formData, res, blockId }) {

    let newJobs = res.jobs.map(job => {
      if (job.coords.length > 0) {
        job.coords = this.getJobMainCity(job.coords[0]);
      } else {
        job.coords = [];
      }
      return job;
    });

    const newBlock = new ResultBlock({
      formData,
      blockId,
      total: res.total,
      jobs: newJobs,
    });

    this.setState({
      activeJobs: [...newBlock.jobData, ...this.state.activeJobs],
      resultBlocks: [newBlock, ...this.state.resultBlocks],
      loading: false
    });
  }

  handleSortData(sortType) {
    switch (sortType) {
      case "location": {
        const locSortJobs = this.state.activeJobs.sort((i, j) => {
          const iState = i[sortType].slice(-2);
          const jState = j[sortType].slice(-2);
          if (iState < jState) {
            return -1;
          } else if (iState > jState) {
            return 1;
          } else {
            if (i[sortType] < j[sortType]) {
              return -1;
            } else if (i[sortType] > j[sortType]) {
              return 1;
            }
            return 0;
          }
        });
        this.setState({ activeJobs: locSortJobs })
        break;
      }

      case "title": {
        const newActiveJobs = this.state.activeJobs.sort((i, j) => {
          if (i[sortType] < j[sortType]) {
            return -1;
          } else if (i[sortType] > j[sortType]) {
            return 1;
          } else {
            return 0;
          }
        });
        this.setState({ activeJobs: newActiveJobs })
        break;
      }

      case "salary": {
        const newActiveJobs = this.state.activeJobs.sort((i, j) => {
          if (i[sortType] > j[sortType]) {
            return -1;
          } else if (i[sortType] < j[sortType]) {
            return 1;
          } else {
            return 0;
          }
        });
        this.setState({ activeJobs: newActiveJobs })
        break;
      }
      default: { }
    }
  }

  handleResetData() {
    this.setState({ activeJobs: [], resultBlocks: [] })
  }

  render() {
    return (
      <div className="app">
        <Header resetData={this.handleResetData} />
        <Main
          handleSearch={this.handleSearch}
          handleSortData={this.handleSortData}
          activeJobs={this.state.activeJobs}
          citiesJobs={this.state.citiesData}
          results={this.state.resultBlocks}
          loading={this.state.loading} />
        <Footer />
      </div>
    );
  }
}

export default App;
