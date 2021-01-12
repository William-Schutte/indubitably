import React from 'react'
import Search from '../Search/Search'
import Map from '../Map/Map'
import JobsList from '../JobsList/JobsList'
import ResultBlocks from '../ResultBlocks/ResultBlocks'
import './Main.css'

const Main = ({ handleSearch, handleSortData, activeJobs, results, loading }) => {
  return (
    <main className="main">
      <Search handleSearch={handleSearch} loading={loading} />
      <section className="main__content">
        <div className="main__left-col">
          <Map activeJobs={activeJobs} />
          <JobsList activeJobs={activeJobs} handleSortData={handleSortData} />
        </div>
        <div className="main__right-col">
          <ResultBlocks results={results} loading={loading} />
        </div>
      </section>
    </main>
  )
}

export default Main
