import React, { useState, useEffect } from 'react'
import commsHelper from '../dal/commsHelper'
import { useHistory } from 'react-router-dom';

export default () => {
    const [breweries, setBreweries] = useState([]);
    const history = useHistory();

    const onSelectEditBrewery = (item) => {
        history.push('/EditBrewery/' + item.id);
    }

    const onSelectDeleteBrewery = (item) => {
        if(window.confirm("ARE YOU SURE YOU WANT TO DELETE "+item.name+"?\n This cannot be undone.")){
            console.log("ok for deletion");
            commsHelper.registerOnDbCompleteHandlers(onDbDeleteComplete, onDbDeleteFail);
            commsHelper.sendIpcEvent('delete-brewery',item);
            console.log("sent");
        }
    }

    const onDbDeleteComplete = () =>{
        console.log("DELETED");
        alert("Item deleted.");
        commsHelper.registerOnDbCompleteHandlers(onDbGetComplete, onDbGetFail);
        commsHelper.sendIpcEvent('get-breweries');
    }

    const onDbDeleteFail = (error)=>{
        alert("Error in deleting item: " + error);
    }


    const onDbGetComplete = (items)=>{
        setBreweries(items);
    }

    const onDbGetFail = (error) => {
        alert("Error in retrieving items: " + error);
    }

    useEffect(() => {
        commsHelper.registerOnDbCompleteHandlers(onDbGetComplete, onDbGetFail);
        commsHelper.sendIpcEvent('get-breweries');
    },[])


    if (breweries.length === 0) {
        return <div>Loading...</div>
    };

    const breweriesHtml = breweries.map((b) => {
        return (
            <li className="list-group-item" key={b.id}>
                <div className="container-fluid row">
                    <div className="w-50">
                        {b.name}
                    </div>
                    <div className="w-25">
                        <button className="btn btn-primary" type="button" onClick={()=>onSelectEditBrewery(b)}>Edit</button>
                    </div>
                    <div className="w-25">
                        <button className="btn btn-danger" type="button" onClick={()=>onSelectDeleteBrewery(b)}>Delete</button>
                    </div>
                </div>
            </li>
        );
    })

    return (
        <div className="container-fluid">
            <h3>
                Edit or Delete Brewery
            </h3>
            <hr />
            <ul className="list-group list-group-flush">
                {breweriesHtml}
            </ul>
        </div>
    );
};