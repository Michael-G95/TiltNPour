import React,{useState} from 'react';
import getDistance from '../distance';
import logger from '../../dal/logger';

function Distributors(props) {
    let [userloc,setUserLoc]=useState({lat:0,lon:0});
    if(navigator.geolocation && userloc.lat === 0 && userloc.lon === 0){
        navigator.geolocation.getCurrentPosition(p=>{
            setUserLoc({
                lat:p.coords.latitude,
                lon:p.coords.longitude
            });
            logger.logDebug("User co-ords obtained successfully");
        },()=>logger.logError("Unable to get user co-ords, distance will not work"))
    }
    const distributorsWithDistance = props.distributors.map(d=>{
        const coords = {lon:Number.parseFloat(d.lon), lat:Number.parseFloat(d.lat)};
        const distance = getDistance(userloc,coords);
        return {
            distance,
            ...d
        }
    })
    const orderedDistributors = distributorsWithDistance.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
    const distributors = orderedDistributors.map(d => {
        return (
            <li key={d.id} className="list-group-item text-center col-md-6 mx-auto">
                {d.name ? <>{d.name}<br /></> : ""}
                {d.address ? <>{d.address}<br /></> : ""}
                {d.contact1 ? <>{d.contact1}<br /></> : ""}
                {d.contact2 ? <>{d.contact2}<br /></> : ""}
                <span className="badge badge-primary badge-pill">{`${d.distance} mi`}</span>
            </li>
        )
    })
    return (
        <div className="container-fluid">
            <h4 className="text-center section-title mx-auto pt-5">
                Distributors
            </h4>
            <ul className="list-group list-group-flush text-center">
                {/*distributors*/""}
                <span className="text-muted mx-0">We're working on this!</span>
            </ul>
        </div>


    )
}

export default Distributors;