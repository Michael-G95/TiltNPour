const Event = require('./event');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require("./database");

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


const insertEvent = (item) => {
    // Try to save the object. 
    // returns the promise
    return insertItem(item, (x) => new Event.Model(Event.standardiseEventFields(x)));
}

const updateEvent = (item) => {
    // Try to save the object. 
    // returns the promise
    
    var event = mapIdToObjectIdForUpdateOrDelete(Event.standardiseEventFields(item));

    return new Promise((resolve, reject) => {
        Event.Model.findOneAndUpdate({ _id: event._id }, event,
            (err, obj) => {
                if (err) reject(err);
                else resolve(obj);
            });
    });

}

const deleteEvent = (item)=>{
    // Try to delete the object.
    // returns the promise

    var Event = mapIdToObjectIdForUpdateOrDelete(Event.standardiseEventFields(item));
    return new Promise((resolve, reject) => {
        event.Model.findOneAndDelete({_id:event._id},
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

const getAllEvents = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Event.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Event.standardiseEventFields(b))
                );

        })
    });
}

const getEvent = (id) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Event.Model.find({ _id: ObjectId(id) }).lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Event.standardiseEventFields(b))
                );
        })
    });
}



module.exports = {
    insertEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
};
