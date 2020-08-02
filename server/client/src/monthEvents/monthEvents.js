import React, { useState, useEffect } from 'react'
import MonthSelector from '../events/monthSelect';
import { useParams } from 'react-router-dom';
import {getAllEvents} from '../dal/dataService';
import logger from '../dal/logger';
import EventsDisplay from '../events/EventsDisplay';
import Jumbotron from '../jumbotron';



const MonthEvents = (props)=>{
    let [events,setEvents] = useState([]);

    useEffect(()=>{
        getAllEvents()
            .then((result)=>{
                setEvents(result.data);
            })
            .catch((err)=>{
                logger.logError(err);
            })
    },[])

    let params = useParams();
    const month = params.month;

    if(events.length === 0)
        return (
            <p className="loading"></p>
        )

    // Have the events data

    const eventsForThisMonth = events.filter(e=>{
        return e.month === month && new Date(e.date) > new Date() 
    });
    console.log(eventsForThisMonth.length);
    console.log(eventsForThisMonth);


    const eventsDisplay = eventsForThisMonth.map(e=> <EventsDisplay event={e} key={e.id}/>)
    return (
        <main className="container-fluid mt-3">
        <Jumbotron title={"Events"} text={<>We've put together some upcoming events you might be interested in.<br />Something we missed? Let us know and we'll add it right here.</>}/>
        <MonthSelector />
        <div className="container-fluid row col-12 col-xl-10 col-md-12 mx-auto mt-4">
            {eventsDisplay}
        </div>
    </main>
    )
} 

export default MonthEvents;