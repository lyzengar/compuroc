import React from 'react';
import Flights from '../Flights/Flights';
import Center from '../Center/Center';
import FlightInfo from '../FlightInfo/FlightInfo';
import './Dashboard.css';

const Dashboard = (props) => {
    return (
        <div className="Dashboard">
            <Flights />
            <Center
                handleChange={props.handleChange}
                handleManSelected={props.handleManSelected}
                motorClass={props.motorClass}
                graphLaunch={props.graphLaunch}
                handleMotorData={props.handleMotorData}
                fillXY={props.fillXY}
                />
            <FlightInfo
                calcLaunch={props.calcLaunch}
                disableButton={props.disableButton}
                maxAlt={props.maxAlt}
                maxVel={props.maxVel}
                tTA={props.tTA}
            />
        </div>
    )

}

export default Dashboard;