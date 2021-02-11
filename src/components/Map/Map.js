import React from 'react';
import './Map.css';
import usMap from '../../images/us-mercator.png';

function Map({ activeJobs }) {
    
    function mapCoords(long, lat) {
        // Due to the mercator projection being a liner representation of radial coords, it
        // stretches lattitudes closer to the poles. This factor scales the points to match.
        const radialScalefactor = (1 - ((90 - lat) / 90) ** 2) ** (1/2);
        const x = `${100*(1 - (long - (-65.4)) / (-125.9 - (-65.4)))}%`;
        const y = `${radialScalefactor*100*((lat - 23.6) / (48.2 - 23.9))}%`;
        return { bottom: y, left: x };
    }

    return (
        <div className="map">
            <img className="map__outline" src={usMap} alt="US Jobs Map" />

            {(activeJobs.length !== 0) && activeJobs.map((job, i) => {
                if (job.lat) {
                    const loc = mapCoords(job.long, job.lat);
                    return (
                        <i className="map__pixel" key={i} style={loc}>
                            <p className="map__city">{job.location}</p>
                        </i>
                    )
                }
            })}
        </div>
    );
}

export default Map;