import React from 'react';
import './Map.css';
import usMap from '../../images/US-black.svg';

function Map() {
    return (
        <div className="map">
            <img className="map__outline" src={usMap} alt="US Jobs Map" />
        </div>
    );
}

export default Map;