import React from 'react';
import Header from './Header';
import Search from './Search';
import Map from './Map';
import JobsList from './JobsList';
import ResultBlocks from './ResultBlocks';
import api from '../utils/api';

function App() {
  
  function handleSearch(data) {
    api.getJobs(data)
      .then((res) => console.log(res));
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Search handleSearch={handleSearch}/>
        <section className="content">
          <Map />
          <JobsList />
          <ResultBlocks />
        </section>
      </main>
    </div>
  );
}

export default App;
