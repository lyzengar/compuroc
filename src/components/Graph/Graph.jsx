import React from 'react';
import './Graph.css';

const Graph = (props) => {
    return (
        <div className="Graph">
            <h1>Graph</h1>
            <button disabled={props.disableButton} onClick={props.calcLaunch || props.graphLaunch}>Graph</button>
        </div>
    )
}

export default Graph;