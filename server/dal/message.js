const mongoose = require("mongoose");

// Example usage: 
// (item)=>new Brewery.Schema(Brewery.populateBreweryFields(item))
// This pattern ensures the Brewery object has the required fields, initialised to "" if not present

const standardiseMessageFields = ({id="",name="",emailcontact="",message="",confirmed="",timestamp=""})=>{
console.log(name);
    return {
        id,
        name,
        emailcontact,
        message,
        confirmed,
        timestamp
    }
}

const createEmptyObject=standardiseMessageFields;

const messageSchema = new mongoose.Schema({
        name:String,
        emailContact:String,
        message:String,
        confirmed:Boolean,
        timestamp:Date
  });

module.exports = { Model: mongoose.model('message', messageSchema), standardiseMessageFields,createEmptyObject }