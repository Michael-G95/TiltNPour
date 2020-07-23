import React, { useState, useEffect } from 'react';
import MonthSelector from './monthSelect';
import {getAllEvents} from '../dal/dataService' 
import logger from '../dal/logger';
import EventsDisplay from './EventsDisplay';
import Jumbotron from '../jumbotron';


const Events = () => {

    let [events,setEvents]=useState([]);

    useEffect(()=>{
        getAllEvents()
        .then((response)=>{
            var eventsData = response.data
            var orderedEvents = eventsData.sort((a, b) => b.date - a.date)
            setEvents(orderedEvents.slice(0,4));
        })
        .catch((err)=>{
            logger.logError(err);
        })
    },[]);

    let eventsDisplay = [];
    if(events.length > 0)
        eventsDisplay = events.map(e=><EventsDisplay event={e} key={e.id}/>)
    return (
        <main className="container-fluid mt-3">
            <Jumbotron />
            <MonthSelector />
            <h4 className="text-center section-title mx-auto mt-4">
                    Upcoming events
            </h4>
            <div className="container-fluid row col-12 col-lg-10 mx-auto mt-4">
                {eventsDisplay}
            </div>
        </main>
    )
}

export default Events;