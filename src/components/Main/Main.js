import React from 'react'
import Search from '../Search/Search'
import Map from '../Map/Map'
import JobsList from '../JobsList/JobsList'
import ResultBlocks from '../ResultBlocks/ResultBlocks'
import './Main.css'

const Main = ({ handleSearch, handleDBSearch, handleSortData, handleResultBlockToggle, handleResultBlockSelect, activeJobs, citiesJobs, results, loading }) => {
    return (
        <main className="main">
            <Search handleSearch={handleSearch} handleDBSearch={handleDBSearch} loading={loading} />
            <section className="main__content">
                <div className="main__row">
                    <Map activeJobs={activeJobs} citiesJobs={citiesJobs} />
                    <ResultBlocks results={results} loading={loading} toggle={handleResultBlockToggle} select={handleResultBlockSelect} />
                </div>
                <div className="main__row">
                    <JobsList activeJobs={activeJobs} handleSortData={handleSortData} />
                </div>
            </section>
        </main>
    )
}

export default Main
