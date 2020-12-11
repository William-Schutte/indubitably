import React from 'react'
import Search from '../Search/Search'
import Map from '../Map/Map'
import JobsList from '../JobsList/JobsList'
import ResultBlocks from '../ResultBlocks/ResultBlocks'
import './Main.css'

const Main = ({ handleSearch, activeJobs, results, loading }) => {
  return (
    <main className="main">
        <Search handleSearch={handleSearch}/>
        <section className="main__content">
          <Map />
          <JobsList activeJobs={activeJobs} />
          <ResultBlocks results={results} loading={loading} />
        </section>
      </main>
  )
}

export default Main
