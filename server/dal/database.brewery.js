const Brewery = require('./brewery');
const mongoose = require('mongoose');
const db = require('./database');
const ObjectId = mongoose.Types.ObjectId;

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


const insertBrewery = (item) => {
    // Try to save the object. 
    // returns the promise
    return insertItem(item, (x) => new Brewery.Model(Brewery.standardiseBreweryFields(x)));
}

const updateBrewery = (item) => {
    // Try to save the object. 
    // returns the promise
    
    var brewery = mapIdToObjectIdForUpdateOrDelete(Brewery.standardiseBreweryFields(item));

    return new Promise((resolve, reject) => {
        Brewery.Model.findOneAndUpdate({ _id: brewery._id }, brewery,
            (err, obj) => {
                if (err) reject(err);
                else resolve(obj);
            });
    });

}

const deleteBrewery = (item)=>{
    // Try to delete the object.
    // returns the promise

    var brewery = mapIdToObjectIdForUpdateOrDelete(Brewery.standardiseBreweryFields(item));
    return new Promise((resolve, reject) => {
    Brewery.Model.findOneAndDelete({_id:brewery._id},
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

const getAllBreweries = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Brewery.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Brewery.standardiseBreweryFields(b))
                );

        })
    });
}

const getBrewery = (id) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Brewery.Model.find({ _id: ObjectId(id) }).lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Brewery.standardiseBreweryFields(b))
                );
        })
    });
}



module.exports = {
    insertBrewery,
    getAllBreweries,
    getBrewery,
    updateBrewery,
    deleteBrewery
};
