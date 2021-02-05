import React from 'react';
import './JobsList.css'

function JobsList({ activeJobs, handleSortData }) {
  console.log(activeJobs[0]);

  return (
    <div className="jobs-list">
      <div className="jobs-list__header">
        <button className="jobs-list__name jobs-list__title" onClick={() => {handleSortData("title")}}>Job Title</button>
        <button className="jobs-list__loc jobs-list__title" onClick={() => {handleSortData("location")}}>Location</button>
        <button className="jobs-list__salary jobs-list__title" onClick={() => {handleSortData("salary")}}>Salary</button>
        <p className="jobs-list__link jobs-list__title">Posted</p>
      </div>

      {activeJobs.map((job, i) => (
        <a className="jobs-list__item" key={i} href={`http://www.indeed.com${job.link}`} target="_blank" rel="noreferrer">
          <h4 className="jobs-list__name">{job.title}</h4>
          <p className="jobs-list__loc">{job.location}</p>
          <p className="jobs-list__salary">{job.salary}</p>
          <p className="jobs-list__posted">{job.posted}</p>
        </a>
      ))}
    </div>
  );
}

export default JobsList;