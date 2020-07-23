import React from 'react'
import beerPlaceholderIcon from './beer-icon-placeholder.png';

function Brewery(props) {
    const name = props.brewery.name;
    const street_address = props.brewery.street_address;
    const established = props.brewery.established? `Est. ${props.brewery.established}` : "";
    const active = props.brewery.active;
    const distance = props.distance && !isNaN(props.distance) ? props.distance : '-';
    const icon_uri = props.brewery.icon_uri;


    return (
        <div className={`container-fluid list-group-item  list-group-item-action brewery-list-item-parent  ${active?"active":""}`}
            onClick={()=>props.onListClick(props.brewery.id)}
            >
                <div className="container-fluid p-0 d-flex justify-content-start align-items-center brewery-list-item">
                <img className="mx-2" src={icon_uri ? icon_uri : beerPlaceholderIcon} height="40px" width="40px" alt=""/>
                
                {name}<br />
                {street_address}<br />
                {established}
               
            <span className={`badge ${active?"badge-light":"badge-primary"} badge-pill ml-auto mr-0 `}>{distance} mi</span>
            </div>
        </div>
    )
}

export default Brewery

// 