import React from 'react';
import Header from './Header';
import Search from './Search';
import Map from './Map';
import JobsList from './JobsList';
import ResultBlocks from './ResultBlocks';

function App() {
  
  function handleSearch() {
    
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Search />
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
