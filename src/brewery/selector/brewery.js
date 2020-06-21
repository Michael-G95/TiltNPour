import React from 'react'

function Brewery(props) {
    const name = props.brewery.name;
    const address = props.brewery.address;
    const contact = props.brewery.contact || "";
    const active = props.brewery.active;
    const distance = props.distance? props.distance : 0;
    return (
        <li className={`list-group-item  list-group-item-action d-flex justify-content-between align-items-center brewery-list-item ${active?"active":""}`}
            onClick={()=>props.onListClick(props.brewery.id)}
            >
                {name}<br />
                {address}<br />
                {contact}
            <span className={`badge ${active?"badge-light":"badge-primary"} badge-pill`}>{distance} mi</span>
        </li>
    )
}

export default Brewery