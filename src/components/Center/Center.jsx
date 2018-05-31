import React from 'react';
import Inputs from '../Inputs/Inputs';
import Graph from '../Graph/Graph';
import './Center.css';

const Center = (props) => {
    return (
        <div className="Center">
            <Inputs
                handleChange={props.handleChange}
                handleManSelected={props.handleManSelected}
            />
            <Graph />
        </div>
    )
}

export default Center;