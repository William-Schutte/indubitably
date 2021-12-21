import React, { useState } from 'react';
import './Map.css';
import usMap from '../../images/us-mercator.png';

function Map({ activeJobs, citiesJobs }) {
    const [heatMapActive, setHeatMapActive] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    function mapCoords(lat, long) {
        // Due to the mercator projection being a liner representation of radial coords, it
        // stretches lattitudes closer to the poles. This factor scales the points to match.
        const radialScalefactor = (1 - ((90 - lat) / 90) ** 2) ** (1 / 2);
        // Right span adjuster
        const right = -66.5;
        // West coast adjustment
        const left = -125.3;
        const x = `${100 * (1 - (long - (right)) / (left - (right)))}%`;
        const y = `${radialScalefactor * 100 * ((lat - 23.6) / (48.2 - 23.9))}%`;
        return { bottom: y, left: x };
    }

    function getCitySize(n) {
        const radius = Math.sqrt(n) * 6 + 4;
        const size = radius.toString() + "px";
        return { width: size, height: size };
    }

    function handleHeatMapToggle(evt) {
        setHeatMapActive(evt.target.checked);
    }

    function handleJobClick(evt) {
        const jobIndex = evt.target.getAttribute('index');
        setSelectedJob(activeJobs[jobIndex]);
    }

    function handleMapClick() {
        setSelectedJob(null);
    }

    return (
        <div className="map">
            <div className="map__container">
                <img className="map__outline" src={usMap} alt="US Jobs Map" onClick={handleMapClick} />
                <>
                    {!heatMapActive ? (
                        (activeJobs.length !== 0) && activeJobs.map((job, i) => {
                            if (job.jobLocation.longitude) {
                                const loc = mapCoords(job.jobLocation.latitude, job.jobLocation.longitude);
                                return (
                                    <button className="map__job-btn" onClick={handleJobClick} key={job.jobId + i}>
                                        <i className="map__pixel" index={i} style={loc} />
                                        <p className="map__city">{`${job.jobLocation.city}, ${job.jobLocation.state}`}</p>
                                    </button>
                                )
                            }
                            return null
                        })) :
                        (citiesJobs.map((city, i) => {
                            const loc = mapCoords(city.latitude, city.longitude);
                            const size = getCitySize(city.count);
                            const styles = { ...loc, ...size };
                            if (city.count > 0) {
                                return (
                                    <div key={city.longitude + i}>
                                        <i className="map__pixel" key={city.longitude + i} style={styles}></i>
                                        <div className="map__city">
                                            <p>{city.city}</p>
                                            <p>{city.count} Jobs</p>
                                        </div>
                                    </div>
                                )
                            }
                        }))
                    }
                </>
                {selectedJob && (
                    <a className="map__selected-job" href={selectedJob?.jobLink} rel="noreferrer" target="blank">
                        <p className="map__selected-job-title">{selectedJob.jobTitle}</p>
                        <p>{selectedJob.jobCompany}</p>
                        <p>{`${selectedJob.jobLocation.city}, ${selectedJob.jobLocation.state}`}</p>
                    </a>
                )}
            </div>
            <div className="map__switchbox" style={heatMapActive ? { color: `#2557A7` } : {}}>Cool City Heat Map
                <label className="map__toggle">
                    <input className="map__toggle-input" type="checkbox" checked={heatMapActive} onChange={handleHeatMapToggle} />
                    <span className="map__toggle-slider"></span>
                </label>
            </div>


        </div>
    );
}

export default Map;