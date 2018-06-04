import React from 'react';
import './FlightInfo.css';

const FlightInfo = (props) => {
    return (
        <div className="FlightInfo">
            <button disabled={props.disableButton} onClick={props.calcLaunch}>Launch</button>
            <h4>Max Altitude: <br/>{props.maxAlt ? parseFloat(props.maxAlt).toFixed(2): "0"} meters</h4>
            <h4>Max Velocity: <br/>{props.maxVel ? parseFloat(props.maxVel).toFixed(2): "0"} meters/sec.</h4>
            <h4>Time To Apogee: <br/>{props.tTA ? parseFloat(props.tTA).toFixed(2): "0"} sec.</h4>
        </div>
    )
}

export default FlightInfo;