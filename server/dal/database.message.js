const Message = require('./message');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require("./database");

const mapIdToObjectIdForUpdateOrDelete = (item) => {
    let tmp = { ...item, _id: item.id };
    delete item.id;
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

const validateMessage= (msg) => {
    let valid = true;

    // Validate for no null/undefs
    for (const property in msg) {
        if (msg[property] === null || msg[property] === undefined)
            valid = false;
    }

    if (!valid)
        return false;

    // Object specific validation

    // Used to validate the sending time. 25h leeway so never an issue with timezones or someones time a bit off.
    // TODO add rejection reason from server
    const in25Hours = new Date();
    in25Hours.setTime(in25Hours.getTime() + (25*60*60*1000)); 

    return (
        typeof msg.name === 'string' && msg.name.length > 0 &&
        typeof msg.emailcontact === 'string' && msg.emailcontact.length > 0 &&
        typeof msg.message === 'string' && msg.message.length > 0 &&
        typeof msg.confirmed === 'boolean' &&
        typeof msg.timestamp === 'object' && msg.timestamp <= in25Hours
    );
}



const insertMessage = (item) => {
    // Try to save the object. 
    // returns the promise
    return insertItem(item, (x) => new Message.Model(Message.standardiseMessageFields(x)));
}

const updateMessage = (item) => {
    // Try to save the object. 
    // returns the promise

    var Message = mapIdToObjectIdForUpdateOrDelete(Message.standardiseMessageFields(item));

    return new Promise((resolve, reject) => {
        Message.Model.findOneAndUpdate({ _id: Message._id }, Message,
            (err, obj) => {
                if (err) reject(err);
                else resolve(obj);
            });
    });

}

const deleteMessage = (item) => {
    // Try to delete the object.
    // returns the promise

    var Message = mapIdToObjectIdForUpdateOrDelete(Message.standardiseMessageFields(item));
    return new Promise((resolve, reject) => {
        Message.Model.findOneAndDelete({ _id: Message._id },
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

const getAllMessages = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Message.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Message.standardiseMessageFields(b))
                );

        })
    });
}

const getMessage = (id) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Message.Model.find({ _id: ObjectId(id) }).lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Message.standardiseMessageFields(b))
                );
        })
    });
}



module.exports = {
    insertMessage,
    getAllMessages,
    getMessage,
    updateMessage,
    deleteMessage,
    validateMessage
};
