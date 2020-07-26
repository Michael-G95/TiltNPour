const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require("./database");
const User = require('./user');
const { reset } = require('nodemon');

const mapIdToObjectIdForUpdateOrDelete = (item) => {
    let tmp = { ...item, _id: item.id };
    delete tmp.id;
    return tmp;
}

const insertItem = (item, createItem) => {
    // Item contains the fields from the UI named same as object
    const theItem = createItem({ ...item });

    return new Promise((resolve, reject) => {
        theItem.save((err, obj) => {
            if (err) reject(err);
            else resolve(obj);
        });
    });
}

const validateUser= (usr) => {
    let valid = true;

    // General validate for no null/undefs
    for (const property in usr) {
        if (usr[property] === null || usr[property] === undefined)
            valid = false;
    }

    if (!valid)
        return false;

    // Object specific validation

    console.log( typeof usr.permissions === 'array', "*** PERMISSIONS IS ARRAY? ***");

    return (
        typeof usr.username === 'string' && usr.username.length > 0 &&
        typeof usr.hashedPassword === 'string' && usr.hashedPassword.length > 0 &&
        typeof usr.permissions === 'array'
    );
}



const insertUser = (item) => {
    // Try to save the object. 
    // returns the promise
    return insertItem(item, (x) => new User.Model(User.standardiseUserFields(x)));
}

const updateUser = (item) => {
    // Try to save the object. 
    // returns the promise

    var User = mapIdToObjectIdForUpdateOrDelete(User.standardiseUserFields(item));

    return new Promise((resolve, reject) => {
        User.Model.findOneAndUpdate({ _id: User._id }, User,
            (err, obj) => {
                if (err) reject(err);
                else resolve(obj);
            });
    });

}

const deleteUser = (item) => {
    // Try to delete the object.
    // returns the promise

    var user = mapIdToObjectIdForUpdateOrDelete(User.standardiseUserFields(item));
    return new Promise((resolve, reject) => {
        User.Model.findOneAndDelete({ _id: user._id },
            (err, obj) => {
                if (err) reject(err);
                else resolve(obj);
            });
    });
}

const mapObjectIdToId = (args) => {

    if (Array.isArray(args)) {
        return args.map(a => {

            let tmp = { ...a, id: a._id.toString() }
            delete tmp.__v;
            delete tmp._id;
            return tmp;
        });
    } else {
        let tmp = args;
        tmp.id = args._id.toString();
        delete tmp.__v;
        delete tmp._id;
        return tmp;
    }
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        User.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => User.standardiseUserFields(b))
                );

        })
    });
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        User.Model.findOne({ _id: ObjectId(id) }).lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the standardise here to ensure same order each time
                // Null check as user using findOne
                resolve(
                    results !== null 
                    ?    User.standardiseUserFields(mapObjectIdToId(results))
                    :   results
                );
        })
    });
}

const getUsername = (username)=>{
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        User.Model.findOne({ username: username }).lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the standardise here to ensure same order each time
                // Null check as user using findOne
                resolve(
                    results !== null 
                    ?    User.standardiseUserFields(mapObjectIdToId(results))
                    :   results
                );
        })
    });
}


module.exports = {
    insertUser,
    getAllUsers, 
    getUserById,
    getUsername,
    updateUser,
    deleteUser,
    validateUser,
    standardiseUserFields:User.standardiseUserFields
};
