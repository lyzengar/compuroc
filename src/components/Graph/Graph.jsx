import React, {Component} from 'react';
import './Graph.css';
import Chart from 'chart.js';

class Graph extends Component {
    componentDidUpdate() {
        console.log(this.props.fillXY)
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: this.props.fillXY.map(coord => coord.x.toFixed(2)),
                datasets: [{
                    label: 'Seconds, Meters',
                    data: this.props.fillXY.map(coord => coord.y),
                    backgroundColor: ['rgba(26, 145, 114, 0.5)'],
                    borderColor: ['rgba(255,99,132,1)'],
                    borderWidth: 1,
                    pointStyle: 'line',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    }
    render() {
        return (
            <div className="graph">
                <canvas id="line-chart"></canvas>
                <div className="saveField">
                <input type="text" placeholder="Name" onChange={this.props.updateName}/>
                <button onClick={this.props.addFlight}>Save</button>
                </div>
            </div>
        )
    }
}

export default Graph;