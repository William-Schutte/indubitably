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

    api.getJobs(data)
      .then((res) => {
        this.setState({ activeJobs: res }, this.createJobBlock({ formData: data, res }));
      });
  }

  createJobBlock({ formData, res }) {
    const newBlock = new ResultBlock({ formData, res });
    // newBlock.getJobsQueried();

    this.setState({ resultBlocks: [newBlock, ...this.state.resultBlocks], loading: false });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Main handleSearch={this.handleSearch} activeJobs={this.state.activeJobs} results={this.state.resultBlocks} loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;
