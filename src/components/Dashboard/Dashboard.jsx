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
                calcLaunch={props.calcLaunch}
                graphLaunch={props.graphLaunch}
                handleMotorData={props.handleMotorData}
            />
            <FlightInfo
                getMotorInfo={props.getMotorInfo}
            />
        </div>
    )

}

export default Dashboard;