import React from 'react';
import './JobsList.css'

function JobsList({ activeJobs, handleSortData }) {
    return (
        <div className="jobs-list">
            <div className="jobs-list__header">
                <button className="jobs-list__name jobs-list__title" onClick={() => { handleSortData("title") }}>Job Title</button>
                <button className="jobs-list__loc jobs-list__title" onClick={() => { handleSortData("location") }}>Location</button>
                <button className="jobs-list__loc jobs-list__title" onClick={() => { handleSortData("location") }}>Remote</button>
                <button className="jobs-list__salary jobs-list__title" onClick={() => { handleSortData("salary") }}>Salary</button>
                <p className="jobs-list__link jobs-list__title">Posted</p>
            </div>

            {activeJobs.map((job, i) => {
                const { jobTitle, jobLocation, jobCompany, jobPay, jobPosted } = job;
                let location = "";
                if (jobLocation.city) {
                    location = `${jobLocation.city}, ${jobLocation.state}`;
                } else {
                    location = jobLocation.remote ? 'Remote' : 'NA';
                }

                
                return (
                    <a className="jobs-list__item" key={i} href={`http://www.indeed.com${job.link}`} target="_blank" rel="noreferrer">
                        <h4 className="jobs-list__name">{jobTitle}</h4>
                        <p className="jobs-list__loc">{location}</p>
                        <p className="jobs-list__loc">{jobLocation.remote ? 'Yes' : 'No'}</p>
                        <p className="jobs-list__salary">{jobPay}</p>
                        <p className="jobs-list__posted">{`${jobPosted.type} ${jobPosted.status}`}</p>
                    </a>
                )
            })}
        </div>
    );
}

export default JobsList;