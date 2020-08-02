var express = require('express');
var router = express.Router();
const Brewery = require('../../dal/database.brewery');
const checkAuthenticated = require('./checkAuthenticated');
const moment = require('moment')

router.get('/', checkAuthenticated, (req,res,next)=>{
    Brewery.getAllBreweries()
        .then((brewerys)=>{
            res.render('admin/brewery/admin_brewery', {brewerys});
        })
        .catch((err)=>{
            res.sendStatus(503);
        })
})

router.get('/new', checkAuthenticated, (req, res, next) => {
    res.render('admin/brewery/admin_new_brewery');
})

router.post('/new',checkAuthenticated,(req,res,next)=>{
    const brewery = req.body;
    Brewery.insertBrewery(brewery)
    .then(()=>{
        res.redirect('/admin/brewery')
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(503);
    })
})




router.get('/edit/:id',checkAuthenticated,(req,res,next)=>{
    Brewery.getBrewery(req.params.id)
    .then((brewerys)=>{
        console.log(brewerys);
        if(brewerys.length > 0) {
            res.render('admin/brewery/admin_edit_brewery', {brewery:brewerys[0]});
        }
        else
            res.sendStatus(404);
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(503);
    })
})

router.post('/edit/:id',checkAuthenticated,(req,res,next)=>{
    const brewery = req.body;
    brewery.id = req.params.id;

    Brewery.updateBrewery(brewery)
    .then((brewerys)=>{
        res.redirect('/admin/brewery')

    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(503);
    })
})

router.delete('/:id',checkAuthenticated,(req,res,next)=>{
    console.log("Deleting brewery");
    console.log(req.user.name + " is trying to delete "+req.params.id);
    // Precaution as breweries are a PITA to enter. May only be deleted by "BreweryAdministrator"
    if(req.user.name !== "BreweryAdministrator"){
        return res.sendStatus(401);
    }
    
    Brewery.deleteBrewery({id:req.params.id})
    .then(()=>{
        res.redirect("/admin/brewery");
    })
    .catch((err)=>{
        res.status(503).send({err});
    })
})



module.exports = router;