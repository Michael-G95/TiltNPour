import React from 'react'
import default_icon from '../brewery/selector/beer-icon-placeholder.png'
const EventsDisplay = ({event})=>{

    let date="";
    var dd = String(new Date(event.date).getDate()).padStart(2, '0');
    var mm = String(new Date(event.date).getMonth() + 1).padStart(2, '0');
    var yyyy = new Date(event.date).getFullYear();

    date = dd + '/' + mm + '/' + yyyy;

    return (
        <div key={event.name} className="container-fluid col-md-5 mx-0 border border-dark rounded mr-2 mt-4 mx-auto">
        <div className="row py-2">
            <div className="col-4">
                <img src={event.img_uri!=="" ? event.img_uri : default_icon} height="100" width="100" alt="" />
            </div>
            <div className="col-8 col-md-12 col-lg-8 my-auto mx-auto">
            <h4>{event.name}</h4>
            <h6>{event.location}</h6>
            <h6>{date}</h6>
            </div>
            <div className="col-8 col-md-12 col-lg-8 mx-auto text-left">
                <p>
                    {event.description}
                </p>
            </div>
        </div>
        
        
    </div>
    )
}

export default EventsDisplay;