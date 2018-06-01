import React, {Component} from 'react';
import './Graph.css';
import Chart from 'chart.js';

class Graph extends Component {
    componentDidMount() {
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4,4],
                datasets: [{
                    label: 'Seconds, Meters',
                    data: [0, 1, 2, 4, 8],
                    backgroundColor: ['rgba(26, 145, 114, 0.5)'],
                    borderColor: ['rgba(255,99,132,1)'],
                    borderWidth: 1
                }]
            },
            options: {
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
                <input type="text" placeholder="Name"/>
                <button>Save</button>
                </div>
            </div>
        )
    }
}

export default Graph;