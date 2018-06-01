import React from 'react';
import './FlightInfo.css';

const FlightInfo = (props) => {
    return (
        <div className="FlightInfo">
            <button disabled={props.disableButton} onClick={props.calcLaunch}>Launch</button>
            <h4>Max Altitude: {props.maxAlt}</h4>
            <h4>Max Velocity: {props.maxVel}</h4>
            <h4>Time To Apogee: {props.tTA ? parseFloat(props.tTA).toFixed(2): "0"} sec.</h4>
        </div>
    )
}

export default FlightInfo;