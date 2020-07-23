import React,{useState} from 'react';
import getDistance from '../distance';
import logger from '../../dal/logger';
import wwwlogo from '../breweryInfo/res/link.svg';

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
    const distributors = orderedDistributors.map((d,index) => {
        return (
            <li key={index} className="container-fluid row list-group-item text-center col-md-6 mx-auto">
                <div className="container-fluid row">
                <div className="col-md-9 mx-auto">
                    {d.name ? <>{d.name}<br /></> : ""}
                    {d.address ? <>{d.address}<br /></> : ""}
                    {d.contact1 ? <>{d.contact1}<br /></> : ""}
                    {d.contact2 ? <>{d.contact2}<br /></> : ""}
                    {d.website ? <>
                        <div className={`mx-auto text-center`}>
                            <a href={d.website}><img className="mx-auto" src={wwwlogo} alt="Website" width="30" height="30" />&nbsp;&nbsp;&nbsp;</a>
                        </div>
                        <br /></> : ""}
                </div>
                <div className="col-md-3">
                    <span className="badge badge-primary badge-pill">{`${d.distance} mi`}</span>
                </div>
                </div>
            </li>
        )
    })
    return (
        <div className="container-fluid">
            <h4 className="text-center section-title mx-auto pt-5">
                Distributors
            </h4>
            <ul className="list-group list-group-flush text-center">
                {distributors.length === 0 ? 
                    <span className="text-muted mx-0">No distributors. If this is wrong, please contact us!</span>:
                    distributors
                }
            </ul>
        </div>


    )
}

export default Distributors;