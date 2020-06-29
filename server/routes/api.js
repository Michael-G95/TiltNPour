var express = require('express');
var router = express.Router();
var breweryApi = require('./api.brewery');
const app = require('../app');


router.get("/gmapsapikey",(req,res)=>{
    console.log("GET_KEY: ",process.env.GMAPS_API_KEY)
    const key = process.env.GMAPS_API_KEY;
    if(key===undefined || key === null || !key){
        // Not loaded from env
        res.sendStatus(503);
    }else{
        res.json({key})
    }
    
})

router.use('/breweries', breweryApi);

module.exports = router;
