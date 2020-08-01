import React, { useState, useEffect } from 'react';

import Map from './map/map'
import dataService from '../dal/dataService'
import Selector from './selector/selector';
import logger from '../dal/logger';
import ErrorPanel from '../errorPanel';
import Distributors from './distributors/distributors';
import BreweryInfo from './breweryInfo/breweryInfo';


function Breweries() {

  let [breweryData, setBreweryData] = useState([]);
  let [error, setError] = useState(false);
  let [selectedBreweryId, setselectedBreweryId] = useState("");
  let [filter,setFilter]=useState("");

  useEffect(() => {
    // Load the brewery data
    dataService.getBreweryData()
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        logger.logDebug(`Breweries loaded: ${data.length}`)
        // Set first brewery to be active
        if(data.length > 0){
          data[0].active = true;
        }
        setBreweryData(data);
        setselectedBreweryId(data[0].id);
      })
      .catch((err) => {
        setError(true);
      })
  }, []);

  if (error) {
    return <ErrorPanel />
  }

  if (breweryData.length === 0 || selectedBreweryId.length ===0) {
    return <></>
  }
  const getSelectedBrewery = (id) => {
    console.log("LEN: "+selectedBreweryId.length);
    if (id === undefined || id === null)
      return breweryData.find((b => b.id === selectedBreweryId));
    else
      return breweryData.find(b => b.id === id);
  }

  const markBreweryActive = (id) => {
    // Update the brewery active to value while preserving state immutability
    let data = [
      ...breweryData
    ];

    // Mark all inactive
    data.forEach(b=>{
      b.active=false;
    });

    // Mark id as active
    let index = data.findIndex(b => b.id === id);
    data[index].active = true;
    setBreweryData(data);
  }

  // Function for the selector to update selected item
  const onListClick = (id) => {
    logger.logDebug(`Selecting id ${id}`)

    // Set current as not active, set new as active, update id
    markBreweryActive(id);
    setselectedBreweryId(id);
  }

  // Apply filter

  let filteredBreweryData = breweryData;
  if(filter.length > 0){ 
    // Filter has been entered
    filteredBreweryData = breweryData.filter(b=>{
      console.log(b);
      return b.name.toUpperCase().includes(filter.toUpperCase())
            || b.street_address.toUpperCase().includes(filter.toUpperCase());
    });
  }; 

  // Find the selected brewery
  const brewery = getSelectedBrewery();

  // Render
  return (
    <main className="container-fluid mt-3">
      <div className="container-fluid row col-12 col-xl-10 col-md-12 mx-auto">
        <Selector breweries={filteredBreweryData} onListClick={onListClick} onFilterChange={(event)=>setFilter(event.target.value)} filterValue={filter}/>
        <Map brewery={brewery} />
        <BreweryInfo brewery={brewery} />
        <Distributors distributors={brewery.distributors} />
        
      </div>
    </main>
  );
}

export default Breweries;
