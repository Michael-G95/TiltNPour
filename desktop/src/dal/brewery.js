const mongoose = require("mongoose");

// Example usage: 
// (item)=>new Brewery.Schema(Brewery.populateBreweryFields(item))
// This pattern ensures the Brewery object has the required fields, initialised to "" if not present

const standardiseBreweryFields = ({id="",name="",established="",street_address="",town="",county="",country="",postcode="",website="",email="",telephone="",
                                facebook="",twitter="",instagram="",trading_as="",company_number="",companies_house_url="",distributors=[],lat=0,lon=0})=>{
console.log(name);
    return {
        id,
        name,
        established,
        street_address,
        town,
        county,
        country,
        postcode,
        website,
        email,
        telephone,
        facebook,
        twitter,
        instagram,
        trading_as,
        company_number,
        companies_house_url,
        distributors,
        lat,
        lon
    }
}

const createEmptyObject=standardiseBreweryFields;

const brewerySchema = new mongoose.Schema({
        name:String,
        established:String,
        street_address:String,
        town:String,
        county:String,
        country:String,
        postcode:String,
        website:String,
        email:String,
        telephone:String,
        facebook:String,
        twitter:String,
        instagram:String,
        trading_as:String,
        company_number:String,
        companies_house_url:String,
        distributors:Array,
        lat:Number,
        lon:Number
  });

module.exports = { Model: mongoose.model('Brewery', brewerySchema), standardiseBreweryFields,createEmptyObject }