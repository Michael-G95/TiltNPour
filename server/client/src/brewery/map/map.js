import React, { useEffect, useState } from 'react';
import logger from '../../dal/logger';
import ErrorPanel from '../../errorPanel';
import { getGmapsApiKey } from '../../dal/dataService';
function Map(props) {
    // Expects prop 'brewery' containing data
    
    const [key,setKey] = useState("");

    useEffect(()=>{
        getGmapsApiKey()
            .then(response=>{
                console.log("LOADED KEY:",response.data.key)
                setKey(response.data.key);
            })
            .catch(error=>{
                logger.logError("ERROR:",error);
            });
    },[])

    if (props.brewery == null || (props.brewery.placeid == null && props.brewery.street_address == null)) {
        // Need a placeid or address to display the map
        logger.logError(`No placeid or address for brewery ${props.brewery.name}`);
        return (
            <ErrorPanel />
        );
    } 

    // Prefer to use placeid, if it is not provided use address
    let parameters = null;
    if (props.brewery.placeid) {
        parameters = `place_id:${props.brewery.placeid}`;
    }else{
        parameters = props.brewery.street_address+", "+props.brewery.town;
    }

    if(key.length===0){
        return <div>Loading...</div>
    }

    return (
        <div className="col-md-7 rounded-lg embed-responsive  embed-responsive-4by3">
            <iframe
                className="embed-responsive-item"
                title="Map"
                width="600"
                height="450"
                style={{ "border": 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${parameters}`}
                allowFullScreen>

            </iframe>
        </div>
    );
}

export default Map;