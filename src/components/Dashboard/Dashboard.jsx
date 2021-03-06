import React from 'react';
import Flights from '../Flights/Flights';
import Center from '../Center/Center';
import FlightInfo from '../FlightInfo/FlightInfo';
import './Dashboard.css';

const Dashboard = (props) => {
    return (
        <div className="Dashboard">
            <Flights
                flights={props.flights}
                loadFlights = {props.loadFlights}
                user={props.user}
            />
            <Center
                handleChange={props.handleChange}
                handleMassChange={props.handleMassChange}
                handleManSelected={props.handleManSelected}
                motorClass={props.motorClass}
                graphLaunch={props.graphLaunch}
                handleMotorData={props.handleMotorData}
                fillXY={props.fillXY}
                addFlight={props.addFlight}
                updateName={props.updateName}
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