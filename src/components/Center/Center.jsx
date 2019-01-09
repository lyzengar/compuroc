import React from 'react';
import Inputs from '../Inputs/Inputs';
import Graph from '../Graph/Graph';
import Errors from '../Errors/Errors';
import './Center.css';

const Center = (props) => {
    return (
        <div className="Center">
            <Inputs
                handleChange={props.handleChange}
                handleMassChange={props.handleMassChange}
                handleManSelected={props.handleManSelected}
                motorClass={props.motorClass}
                handleMotorData={props.handleMotorData}
            />
            <Errors />
            <Graph
                calcLaunch={props.calcLaunch}
                graphLaunch={props.graphLaunch}
                disableButton={props.disableButton}
                fillXY={props.fillXY}
                addFlight={props.addFlight}
                updateName={props.updateName}
            />
        </div>
    )
}

export default Center;