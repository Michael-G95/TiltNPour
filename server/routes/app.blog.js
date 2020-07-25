var express = require('express');
var path = require('path');
var router = express.Router();
var Article = require('../dal/database.article');
var marked = require('marked');
// Import and setups for rendering and sanitizing 
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

var ejs = require('ejs')

// Helper methods
var _viewsDir = path.join(__dirname, "..", "views");
const getView = function (path) {
    return _viewsDir + "\\" + path + ".ejs";
}
const renderFileSafely = async function (file, arg1) {
    const html = (await ejs.renderFile(getView(file), arg1));
    return DOMPurify.sanitize(html);
}


// Return list of article summary
router.get('/get', async (req, res, next) => {
    try{
    const articles = await Article.getAllArticles();
    res.json(articles);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/get/:article', async (req, res, next) => {
    console.log("Article:", req.params.article)
    try {
        const article = await Article.getArticle(req.params.article);
        
        if(article.length > 0){
            article[0].dateString = article[0].date.toLocaleDateString();
            article[0].html = marked(article[0].markdown);
            const html = await renderFileSafely('_article', {article:article[0]});
            res.send(html);
        }
        else{
            res.sendStatus(404);
        }
        
    }
    catch (err) {
        console.log(err);
        res.send("There was a problem loading the article.")
    }
})

router.delete('/:article',async(req,res,next)=>{
    console.log("Deleting article:",req.params.article);

    try{
        Article.deleteArticle(req.params.article);
    }
    catch(err){
        console.log(err);
        res.json({error:err});
    }
})

router.put('/:article',async (req,res,next)=>{
    console.log("Editing article:",req.params.article);

})

module.exports = router;
