var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json()); // for parsing application/json

router.post("/", (req, res, next) => {
    //expects 
    //http://localhost:8999/api/resources/labs
    console.log("someone requestd");
    console.log(req.body.token);
    res.send({fuck: 'yea'});

});
module.exports = router;
