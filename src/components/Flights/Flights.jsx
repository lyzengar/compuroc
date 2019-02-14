import React from 'react';
import './Flights.css';

const Flights = (props) => {
    let userFlights = props.user ?
        <div>
        <h3>My Flights</h3>
        <ol>
        {props.flights ? props.flights.map(data => (
            <li>{data.name}</li>
        )) : ""}
        </ol>
        </div>
        :
        null;
    return (
        <div className="Flights">
            {userFlights}
        </div>
        // <div className="Flights">
        //     <h3>My Flights</h3>
        //     <ol>
        //     {props.flights ? props.flights.map(data => (
        //         <li>{data.name}</li>
        //     )) : ""}
        //     </ol>
        // </div>
    )
}

export default Flights;