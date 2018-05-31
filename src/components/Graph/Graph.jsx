import React from 'react';
import './Graph.css';

const Graph = (props) => {
    return (
        <div className="Graph">
            <h1>Graph</h1>
            <button onClick={props.calcLaunch}>Graph</button>
        </div>
    )
}

export default Graph;