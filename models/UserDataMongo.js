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

var UserDataSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    profilePic: String,
    userID: String,
    online: Boolean,
    lastSeen: String,
    bio: String,
    privateConvList: Array,
    groupConvList: Array,
    channelConvList: Array,
},
    { versionKey: false, id: false }
);
UserDataSchema.set('toJSON', { virtuals: true });
var UserData = module.exports = mongoose.model("UserData", UserDataSchema);


module.exports.createUser = (ap, callback) => {
    var ap = new UserData({
        firstName: "Biruk",
        lastName: "Misganaw",
        userName: "buranch",
        profilePic: "wow.jpg",
        userID: "5a9b6de8c678e3313c89fdb9",
        online: false,
        lastSeen: "yesterday",
        bio: "Haha life is awesome",
        privateConvList: ['5abd3968d1df562ab4bea0ca', '5abd3c40cc5292f4d9d9fab1'],
        groupConvList: ['5abd3a2f6bb81b047076ec42', '5abd3c82cc5292f4d9d9fb38'],
        channelConvList: ['5abd3ae4384fbe293ce51061', '5abd3c9fcc5292f4d9d9fb84'],
    })
    console.log("About to create a User");
    ap.save(callback);
};

module.exports.findAUser = (user, callback) => {
    // console.log('onMong');
    UserData.findOne(user, callback);

}

