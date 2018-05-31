import React from 'react';
import './FlightInfo.css';

const FlightInfo = (props) => {
    return (
        <div className="FlightInfo">
            <button onClick={props.getMotorInfo}>Launch</button>
            <h4>Max Altitude:</h4>
            <h4>Max Velocity:</h4>
            <h4>Time To Apogee:</h4>
            <input type="text" placeholder="Name"/>
            <button>Save</button>
        </div>
    )
}

export default FlightInfo;