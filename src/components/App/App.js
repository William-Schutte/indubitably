import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/api';
import ResultBlock from '../../utils/resultBlock';

import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeJobs: [],
      resultBlocks: [],
      loading: false,
    }
    this.handleSearch = this.handleSearch.bind(this);
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

  createJobBlock({ formData, res, blockId }) {
    const newBlock = new ResultBlock({ 
      formData,
      blockId,
      total: res.total,
      jobs: res.jobs,
    });

    // res = { total, jobs }
    // Set activeJobs to these

    this.setState({ activeJobs: res.jobs, resultBlocks: [newBlock, ...this.state.resultBlocks], loading: false });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Main handleSearch={this.handleSearch} activeJobs={this.state.activeJobs} results={this.state.resultBlocks} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
