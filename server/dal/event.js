const mongoose = require("mongoose");

// Example usage: 
// (item)=>new Brewery.Schema(Brewery.populateBreweryFields(item))
// This pattern ensures the Brewery object has the required fields, initialised to "" if not present

const standardiseEventFields = ({id="",name="",date=0,month="",description="",location="",lon=0,lat=0,img_uri=""})=>{
console.log(name);
    return {
        id,
        name,
        date,
        month,
        description,
        location,
        lon,
        lat,
        img_uri
    }
}

const createEmptyObject=standardiseEventFields;

const eventSchema = new mongoose.Schema({
        name:String,
        date:Date,
        month:String,
        description:String,
        location:String,
        lon:Number,
        lat:Number,
        img_uri:String
  });

module.exports = { Model: mongoose.model('Event', eventSchema), standardiseEventFields,createEmptyObject }