const mongoose = require("mongoose");

// user document for authentication

const standardiseUserFields = ({ id = "", username = "", hashedPassword = "", permissions = "" }) => {
    return {
        id,
        username,
        hashedPassword,
        permissions
    }
}

const createEmptyObject = standardiseUserFields;

const userSchema = new mongoose.Schema({
    username:String,
    hashedPassword:String,
    permissions:Array
});

module.exports = { Model: mongoose.model('user', userSchema), standardiseUserFields, createEmptyObject }