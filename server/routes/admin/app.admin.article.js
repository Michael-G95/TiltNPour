var express = require('express');
var path = require('path');
var router = express.Router();
var Article = require('../../dal/database.article');
var marked = require('marked');

// Import and setups for rendering and sanitizing 
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

var ejs = require('ejs');
const e = require('express');
const checkAuthenticated = require('./checkAuthenticated');

// Helper methods
var _viewsDir = path.join(__dirname, "..","..", "views");
const getView = function (dir) {
    return path.join(_viewsDir, dir + ".ejs");
}
const renderFileSafely = async function (file, arg1) {
    const html = (await ejs.renderFile(getView(file), arg1));
    return DOMPurify.sanitize(html);
}

router.post('/get/preview', checkAuthenticated , async (req,res,next)=>{
    
    try{
    var data = req.body;
    data.dateString = new Date().toLocaleDateString();
    data.html = marked(data.markdown);
    console.log("GET PREVIEW: data",data);
    const html = await renderFileSafely(path.join('user','_article'), {article:data});
    console.log("GET PREVIEW: got html",html);
    htmlPreview = DOMPurify.sanitize(html);
    console.log("GET PREVIEW: sanitized",htmlPreview);
    return res.json({htmlPreview:html});
    }catch(err){
        console.log(err)
        res.status(500).json({error:err});
    }
})
 
const articles = [
    {
        title: "Title",
        date: Date.now(),
        description: "Description"
    }
]

router.get('/', checkAuthenticated, async (req, res, next) => {
    console.log("Loading admin page");
    const articles = await Article.getAllArticles();
    res.render("admin/article/admin_article", { articles });
})

router.get('/edit/:id', checkAuthenticated, async (req, res, next) => {
    console.log("Loading edit page for id");
    const article = await Article.getArticle(req.params.id);
    res.render("admin/article/admin_edit_article", { article: article[0] });
})


router.get('/new', checkAuthenticated, async (req, res, next) => {
    res.render('admin/article/admin_new_article');
})

router.post('/new', checkAuthenticated, async (req, res, next) => {
    // add date
    console.log(req.body);

    const article = req.body;
    article.date = new Date();

    if (Article.validateArticle(req.body)) {
        Article.insertArticle(req.body)
            .then((article) => {
                res.redirect(`/admin/${article.id}`)
                return;
            })
            .catch((err) => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(422).json({ error: "failed validation" });
        return;
    }
})



router.get('/:id', checkAuthenticated, async (req, res, next) => {
    console.log("Loading id");
    const article = await Article.getArticle(req.params.id);
    console.log(article[0])
    if (article.length > 0) {
        res.render("admin_article_view", { article: article[0] });
    } else {
        res.sendStatus(404);
    }

})

router.post('/edit/:id', checkAuthenticated, async (req, res, next) => {
    console.log("Editing for id");
    const article = req.body;
    article.date = new Date();
    article.id = req.params.id;

    if (Article.validateArticle(req.body)) {

        try {
            Article.updateArticle(article)
                .then(() => {
                    res.redirect('/admin/article');
                })
                .catch((err) => {
                    console.log("Caught in .catch")
                    res.status(500).json({ error: err });
                })
        }
        catch (err) {
            console.log("Caught try")
            res.status(500).json({ error: err });
        }
    } else {
        res.status(422).json({ error: "failed validation" });
        return;
    }

})

router.delete("/:id", checkAuthenticated,async (req,res,next)=>{
    console.log("Deleting",req.params.id);
    try{
        Article.deleteArticle({id:req.params.id})
        .then(()=>{
            res.redirect("/admin/article")
        })
    }
    catch (err){
        res.status(500).json({error:err})
    }
})






module.exports = router;
