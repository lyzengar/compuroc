import React from 'react';
import './FlightInfo.css';

const FlightInfo = (props) => {
    return (
        <div className="FlightInfo">
            <button onClick={props.getMotorInfo}>Launch</button>
        </div>
    )
}

export default FlightInfo;