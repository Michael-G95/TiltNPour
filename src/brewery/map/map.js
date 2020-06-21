import React from 'react';
import { GMAPS_API_KEY } from '../../dal/env';
import logger from '../../dal/logger';
import ErrorPanel from '../../errorPanel';
function Map(props) {
    // Expects prop 'brewery' containing data

    if (props.brewery == null || (props.brewery.placeid == null && props.brewery.address == null)) {
        // Need a placeid or address to display the map
        logger.logError(`No placeid or address for brewery ${props.brewery}`);
        return (
            <ErrorPanel />
        );
    }

    // Prefer to use placeid, if it is not provided use address
    let parameters = null;
    if (props.brewery.placeid) {
        parameters = `place_id:${props.brewery.placeid}`;
    }else{
        parameters = props.brewery.address;
    }

    logger.logDebug(`Parameters:${parameters}`);
    return (
        <div className="col-7">
            <iframe
                width="600"
                height="450"
                frameBorder="0" style={{ "border": 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${GMAPS_API_KEY}&q=${parameters}`}
                allowFullScreen>

            </iframe>
        </div>
    );
}

export default Map;