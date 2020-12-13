import React from 'react';
import './Map.css';
// import usMap from '../../images/calibrate.gif';
import usMap from '../../images/us-mercator.jpg';
// import usMap from '../../images/US-black.svg';

function Map({ activeJobs }) {
    
    function mapCoords(long, lat) {
        const x = `${100*(1 - (long - (-64.5)) / (-127 - (-64.5)))}%`;
        const y = `${8.4+92*(1 - (lat - 19.9) / (50 - 19.9))}%`;

        return { top: y, left: x }
    }

    return (
        <div className="map">
            <img className="map__outline" src={usMap} alt="US Jobs Map" />

            {(activeJobs.length !== 0) && activeJobs.map((job, i) => {
                if (job.lat) {
                    const loc = mapCoords(job.long, job.lat);
                    return (
                        <i className="map__pixel" key={i} style={loc} />
                    )
                }
                return <></>
            })}
        </div>
    );
}

export default Map;