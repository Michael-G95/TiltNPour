import React, { useState } from 'react';
import Brewery from './brewery';
import Search from './search';
import getDistance from '../distance';

function Selector(props) {
    let [userloc,setUserLoc]=useState({lat:0,lon:0});
    if(navigator.geolocation && userloc.lat === 0 && userloc.lon === 0){
        navigator.geolocation.getCurrentPosition(p=>{
            setUserLoc({
                lat:p.coords.latitude,
                lon:p.coords.longitude
            });
        },
        (error)=>{
            console.log("ERROR accessing geolocation: "+error.message);
        })
    }
    const breweries = props.breweries.map(b=>{
        var bCoord={
            lat:Number.parseFloat(b.lat),
            lon:Number.parseFloat(b.lon)
        };
        return <Brewery key={b.id} brewery={b} onListClick={props.onListClick} distance={getDistance(userloc,bCoord)}/>;
    });
    return (
        <div className="col-md-5 b-danger">
            <div className="brewery-list list-group list-group-flush  brewery-selector">
                <Search onChange={props.onFilterChange} value={props.filterValue}/>
                {breweries}
            </div>
        </div>
    ); 
}

export default Selector;