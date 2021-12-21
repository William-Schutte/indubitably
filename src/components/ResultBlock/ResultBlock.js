import React from 'react'

const ResultBlock = ({ block, index, toggle, select }) => {
    const { formData, selected, active } = block;

    function handleToggle(evt) {
        toggle(evt.target.checked, index);
    }

    function handleSelected() {
        select(!selected, index);
    }

    return (
        <button className={`result-block ${active && 'result-block_selected'}`} key={index} onClick={handleSelected}>
            <div className="result-block__header">
                <h2 className="result-block__title">{formData.what.replace(/\b\w/g, l => l.toUpperCase())}<br />in {formData.where ? formData.where : "the US"}</h2>
                <label className="result-block__toggle">
                    <input className="result-block__toggle-input" type="checkbox" defaultChecked="true" onChange={handleToggle} />
                    <span className="result-block__toggle-slider"></span>
                </label>
            </div>
            {!selected && (
                <div className={`result-block__data`}>
                    <h3 className="result-block__stat">Total Jobs</h3>
                    <p className="result-block__result">{block.totalJobsCount}</p>
                    <h3 className="result-block__stat">Jobs Queried</h3>
                    <p className="result-block__result">{block.jobsQueried}</p>
                    <h3 className="result-block__stat">Biggest State</h3>
                    <p className="result-block__result">{block.getTopState()}</p>
                    <h3 className="result-block__stat">Biggest City</h3>
                    <p className="result-block__result">{block.getTopCity()}</p>
                    <h3 className="result-block__stat">Entry Level</h3>
                    <p className="result-block__result">{formData.entryLevel ? `Yes` : `No`}</p>
                    <h3 className="result-block__stat">Recent</h3>
                    <p className="result-block__result">{formData.newerJobs ? `Yes` : `No`}</p>
                </div>)
            }
        </button>
    )
}

export default ResultBlock
