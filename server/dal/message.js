const mongoose = require("mongoose");

// Example usage: 
// (item)=>new Message.Schema(Message.populateMessageFields(item))
// This pattern ensures the Brewery object has the required fields, initialised to "" if not present

const standardiseMessageFields = ({id="",name="",emailContact="",message="",confirmed="",timestamp=""})=>{
    return {
        id,
        name,
        emailContact,
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