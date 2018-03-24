var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cfg = require('./config');

var User = require('./../models/UserMongo');
var UserData = require('./../models/UserDataMongo');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json()); // for parsing application/json

router.post("/userinfo", function(req, res){
  // console.log(req.body);
  // console.log(req.body.nameValuePairs);
  var id;
  if(req.body.nameValuePairs){
    id = req.body.nameValuePairs.id;
  }
  else{
    id = req.body.id
  }
  // console.log('id Final ', id);
  UserData.findAUser({ userID: id}, (err, user)=>{
    if(err) return console.log('cant find usr');
    // console.log('found user')

    res.send(user);
  });
});

router.post("/token", function (req, res) {
  console.log('token');
  console.log(req.body);
  // console.log(JSON.parse(req.body));
  //change this into mongoDB
  if (req.body.email && req.body.password) {
    User.findAUser(req.body, (err, user) => {
      if (err) return console.log('fuck it');
      // console.log(user);
      if (user) {
        var payload = {
          id: user._id
        };
        console.log('payload');
        console.log(payload);
        // var token = jwt.encode(payload, cfg.jwtSecret);
        
        var token = jwt.sign({userId: user['_id'] ,payload: payload}, cfg.jwtSecret);
        res.json({
          token: token,
          id: payload.id
        });
      } else {
        console.log('401');
        res.sendStatus(401);
      }
    });
  } else {
    console.log('401');
    res.sendStatus(401);
  }
});

module.exports = router;
// module.exports = users;
