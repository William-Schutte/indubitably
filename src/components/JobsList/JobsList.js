import React from 'react';
import './JobsList.css'

function JobsList({ activeJobs, handleSortData }) {
    return (
        <>
            {activeJobs.length > 0 && (
                <div className="jobs-list">
                    <div className="jobs-list__header">
                        <button className="jobs-list__name jobs-list__title" onClick={() => { handleSortData("title") }}>Job Title</button>
                        <button className="jobs-list__name jobs-list__title" onClick={() => { handleSortData("title") }}>Company</button>
                        <button className="jobs-list__salary jobs-list__title" onClick={() => { handleSortData("salary") }}>Salary</button>
                        <button className="jobs-list__loc jobs-list__title" onClick={() => { handleSortData("location") }}>Location</button>
                        <button className="jobs-list__remote jobs-list__title" onClick={() => { handleSortData("location") }}>Remote</button>
                        <p className="jobs-list__posted jobs-list__title">Posted</p>
                    </div>

                    {activeJobs.map((job, i) => {
                        const { jobTitle, jobLocation, jobCompany, jobPay, jobPosted, jobLink } = job;
                        let location = "";
                        if (jobLocation.city) {
                            location = `${jobLocation.city}, ${jobLocation.state}`;
                        } else {
                            location = jobLocation.remote ? 'Remote' : 'NA';
                        }


                        return (
                            <a className="jobs-list__item" key={i} href={jobLink} target="_blank" rel="noreferrer">
                                <h4 className="jobs-list__name">{jobTitle}</h4>
                                <h4 className="jobs-list__name">{jobCompany}</h4>
                                <p className="jobs-list__salary">{jobPay}</p>
                                <p className="jobs-list__loc">{location}</p>
                                <p className="jobs-list__remote">{jobLocation.remote ? 'Yes' : '-'}</p>
                                <p className="jobs-list__posted">{`${jobPosted.status}`}</p>
                            </a>
                        )
                    })}
                </div>
            )}
        </>
    );
}

export default JobsList;