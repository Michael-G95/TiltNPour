const mongoose = require("mongoose");

// Example usage: 
// (item)=>new Article.Schema(Article.populateArticleFields(item))
// This pattern ensures the Brewery object has the required fields, initialised to "" if not present

const standardiseArticleFields = ({id="",title="",description="",date=null,markdown="",author=""})=>{
    return {
        id,
        title,
        description,
        date,
        markdown,
        author
    }
}

const getSummaryForArticle = (article)=>{
    return {
        id:article.id,
        title:article.title,
        description:article.description,
        date:article.date,
        author:article.author
    }
}

const createEmptyObject=standardiseArticleFields;

const ArticleSchema = new mongoose.Schema({
        title:String,
        description:String,
        markdown:String,
        date:Date,
        author:String

  });

module.exports = { Model: mongoose.model('Article', ArticleSchema), standardiseArticleFields,createEmptyObject,getSummaryForArticle}