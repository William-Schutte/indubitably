import React from 'react'
import Search from '../Search/Search'
import Map from '../Map/Map'
import JobsList from '../JobsList/JobsList'
import ResultBlocks from '../ResultBlocks/ResultBlocks'
import './Main.css'

const Main = ({ handleSearch, handleSortData, handleResultBlockToggle, handleResultBlockSelect, activeJobs, citiesJobs, results, loading }) => {
  return (
    <main className="main">
      <Search handleSearch={handleSearch} loading={loading} />
      <section className="main__content">
        <div className="main__left-col">
          <Map activeJobs={activeJobs} citiesJobs={citiesJobs}/>
          <JobsList activeJobs={activeJobs} handleSortData={handleSortData} />
        </div>
        <div className="main__right-col">
          <ResultBlocks results={results} loading={loading} toggle={handleResultBlockToggle} select={handleResultBlockSelect} />
        </div>
      </section>
    </main>
  )
}

export default Main
