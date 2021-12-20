import React from 'react';
import './Map.css';
import usMap from '../../images/us-mercator.png';

function Map({ activeJobs, citiesJobs }) {
    const [heatMapActive, setHeatMapActive] = React.useState(false);

    function mapCoords(lat, long) {
        // Due to the mercator projection being a liner representation of radial coords, it
        // stretches lattitudes closer to the poles. This factor scales the points to match.
        const radialScalefactor = (1 - ((90 - lat) / 90) ** 2) ** (1 / 2);
        const x = `${100 * (1 - (long - (-65.4)) / (-125.9 - (-65.4)))}%`;
        const y = `${radialScalefactor * 100 * ((lat - 23.6) / (48.2 - 23.9))}%`;
        return { bottom: y, left: x };
    }

    function getCitySize(cityData) {
        const radius = cityData * 2 + 2;
        const size = radius.toString() + "px";
        return { width: size, height: size };
    }

    return (
        <div className="map">
            <div className="map__container">
                <img className="map__outline" src={usMap} alt="US Jobs Map" />
                <>
                    {!heatMapActive ? (
                        (activeJobs.length !== 0) && activeJobs.map((job, i) => {
                            if (job.jobLocation.longitude) {
                                const loc = mapCoords(job.jobLocation.latitude, job.jobLocation.longitude);
                                return (
                                    <>
                                        <i className="map__pixel" div key={i} style={loc} />
                                        <p className="map__city">{`${job.jobLocation[0]}, ${job.jobLocation[1]}`}</p>
                                    </>
                                )
                            }
                            return null
                        })) :
                        ((citiesJobs.length !== 0) && citiesJobs.map((city, i) => {
                            const loc = mapCoords(city[3], city[2]);
                            const size = getCitySize(city[5].count);
                            const styles = { ...loc, ...size };
                            return (
                                <>
                                    <i className="map__pixel" key={i} style={styles}></i>
                                    <div className="map__city">
                                        <p>{city[0]}</p>
                                        <p>{city[5].count} Jobs</p>
                                    </div>
                                </>
                            )
                        }))
                    }
                </>
            </div>
            <div className="map__switchbox" style={heatMapActive ? { color: `#2557A7` } : {}}>Cool City Heat Map
                <label className="map__toggle">
                    <input className="map__toggle-input" type="checkbox" checked={heatMapActive} onChange={() => { setHeatMapActive(!heatMapActive) }} />
                    <span className="map__toggle-slider"></span>
                </label>
            </div>


        </div>
    );
}

export default Map;