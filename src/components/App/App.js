import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/api';

import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeJobs: [],
      resultBlocks: [],
    }
    this.handleSearch = this.handleSearch.bind(this);

  }
  handleSearch(data) {
    api.getJobs(data)
      .then((res) => {
        this.setState({ activeJobs: res });
      });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Main handleSearch={this.handleSearch} activeJobs={this.state.activeJobs} />
      </div>
    );
  }
}

export default App;
