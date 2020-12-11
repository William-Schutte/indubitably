import React from 'react';
import './ResultBlocks.css'

function ResultBlocks({ results, loading }) {
    return (
        <section className="result-blocks">
            {loading && (
            <div className="result-block">
                <div className="result-block__header">
                    <h2 className="result-block__title">Loading Job Data</h2>
                    <label className="result-block__toggle">
                        <input className="result-block__toggle-input" type="checkbox" />
                        <span className="result-block__toggle-slider"></span>
                    </label>
                </div>
                <div className="result-block__data">
                    <i className="result-block__loader"></i>
                    <h3 className="result-block__stat">Entry Level</h3>
                    <p className="result-block__result"></p>
                    <h3 className="result-block__stat">Newly Posted</h3>
                    <p className="result-block__result"></p>
                    <h3 className="result-block__stat">Total Jobs</h3>
                    <p className="result-block__result"></p>
                    <h3 className="result-block__stat">Jobs Queried</h3>
                    <p className="result-block__result"></p>
                    <h3 className="result-block__stat">Biggest State</h3>
                    <p className="result-block__result"></p>
                    <h3 className="result-block__stat">Biggest City</h3>
                    <p className="result-block__result"></p>
                </div>
            </div>)}

            {results.map((block, i) => (
                <div className="result-block" key={i}>
                <div className="result-block__header">
                    <h2 className="result-block__title">{block.searchPhrase}</h2>
                    <label className="result-block__toggle">
                        <input className="result-block__toggle-input" type="checkbox" />
                        <span className="result-block__toggle-slider"></span>
                    </label>
                </div>
                <div className="result-block__data">
                    <h3 className="result-block__stat">Entry Level</h3>
                    <p className="result-block__result">{block.entryLevel ? `Yes` : `No`}</p>
                    <h3 className="result-block__stat">Newly Posted</h3>
                    <p className="result-block__result">{block.newerJobs ? `Yes` : `No`}</p>
                    <h3 className="result-block__stat">Total Jobs</h3>
                    <p className="result-block__result">Todo: Get total from API</p>
                    <h3 className="result-block__stat">Jobs Queried</h3>
                    <p className="result-block__result">{block.jobsQueried}</p>
                    <h3 className="result-block__stat">Biggest State</h3>
                    <p className="result-block__result">na</p>
                    <h3 className="result-block__stat">Biggest City</h3>
                    <p className="result-block__result">na</p>
                </div>
            </div>))}
        </section>
    );
}

export default ResultBlocks;