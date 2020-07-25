const Article = require('./article');
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

const validateArticle = (article) => {
    let valid = true;

    // General validate for no null/undefs
    for (const property in article) {
        if (article[property] === null || article[property] === undefined)
            valid = false;
    }

    if (!valid)
        return false;

    // Object specific validation

    return (
        typeof article.title === 'string' && article.title.length > 0 &&
        typeof article.description === 'string' && article.description.length > 0 &&
        typeof article.markdown === 'string' && article.markdown.length > 0 ,
        typeof article.author === 'string' && article.author.length > 0 
    );
}



const insertArticle = (item) => {
    // Try to save the object. 
    // returns the promise
    return insertItem(item, (x) => new Article.Model(Article.standardiseArticleFields(x)));
}

const updateArticle = (item) => {
    // Try to save the object. 
    // returns the promise
    console.log(item);
    var article = mapIdToObjectIdForUpdateOrDelete(Article.standardiseArticleFields(item));
    console.log(article);
    return new Promise((resolve, reject) => {
        Article.Model.findOneAndUpdate({ _id: article._id }, article, {new:true},
            (err, obj) => {
                if (err) reject(err);
                else resolve(mapObjectIdToId(obj));
            });
    });

}

const deleteArticle = (item) => {
    // Try to delete the object.
    // returns the promise
    console.log(article);
    var article = mapIdToObjectIdForUpdateOrDelete(item);
    console.log(article);
    return new Promise((resolve, reject) => {
        Article.Model.findOneAndDelete({ _id: article._id },
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

const getAllArticles = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Article.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Article.standardiseArticleFields(b))
                );

        })
    });
}

const getArticle = (id) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Article.Model.find({ _id: ObjectId(id) }).lean().exec((err, results) => {
            console.log("RESULTS:",results);
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Article.standardiseArticleFields(b))
                );
        })
    });
}

const getArticleSummaries = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Article.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                // Also summarising here to remove markdown as don't want to send this with summary
                resolve(
                    Article.getSummaryForArticle(
                        mapObjectIdToId(results)
                            .map(b => Article.standardiseArticleFields(b))
                    )
                );

        })
    });
}

module.exports = {
    insertArticle,
    getAllArticles,
    getArticle,
    updateArticle,
    deleteArticle,
    validateArticle
};
