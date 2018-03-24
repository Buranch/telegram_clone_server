const mongo = require('mongodb');
const mongoose = require('mongoose');
var opts = { useMongoClient: true };
mongoose.Promise = global.Promise;
// mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
mongoose.connect('mongodb://localhost/telegramclone', opts, (err, s) => {
    if (err) {
        console.log("error bappened connectin database");
    } else {
        console.log("Database connection established!!");
    }
});


var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    profilePic: String,
    email: String
},
    { versionKey: false, id: false }
);
UserSchema.set('toJSON', { virtuals: true });
var User = module.exports = mongoose.model("User", UserSchema);


module.exports.createUser = (ap, callback) => {
    var ap = new User({
        firstName: "biruk",
        lastName: "misganaw",
        password: "password",
        email: "birukmisanaw@gmail.com"
    })
    console.log("About to create a User");
    ap.save(callback);
};

module.exports.findAUser = (user, callback) => {
    // console.log('onMong');
    // console.log(user);
    User.findOne(user, callback);

}
