var passport = require("passport");
var passportJWT = require("passport-jwt");
// var users = require("./users.js");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

var users = [
    {
        id: 1,
        name: 'biruk',
        email: 'biruk@gmail.com',
        password: 'biruk123'
    },
    {
        id: 2,
        name: 'heni',
        email: 'heni@gmail.com',
        password: 'heni123'

    }
];

module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
        console.log('payload ', payload);
        console.log(params);
        console.log(users); 
        var user = null;
        Object.keys(users).forEach(usr => {
            console.log('iterating throught');
            console.log(usr);
            if(users[usr].id == payload.id){
                console.log('found the ID')
                console.log(users[usr]);
                user = users[usr];
            }
        })
        console.log('requested user');
        console.log(user);
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            console.log("authicaion");
            console.log(params);
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};