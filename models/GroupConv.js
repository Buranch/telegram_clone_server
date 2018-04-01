const mongo = require('mongodb');
const mongoose = require('mongoose');
var opts = { useMongoClient: true };
const Message = require('./MessageMongo');
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

var GroupConvSchema = mongoose.Schema({
    name: String,
    profilePic: String,
    bio: String,
    participants: Array,
    lastMsg: Object
},
    { versionKey: false, id: false }
);
GroupConvSchema.set('toJSON', { virtuals: true });
var GroupConv = module.exports = mongoose.model("GroupConv", GroupConvSchema);


module.exports.createGroupConv = (ap, callback) => {
    var ap = new GroupConv({
        participants: [
            "5aa63641567d43e6f42f8ad9",
            "5aa4f2bf26051827082b0296"
        ],
        name: "SE",
        profilePic: "/about.jpg",
        bio: "A group we use",
        lastMsg: new Message({
            senderID: "5aa4f2bf26051827082b0296",
            conversationID: "5aa532ab52c5dd1cd48ff078",
            timeStamp: Date.now(),
            body: "wowwowwww lol."
        })
    });
    console.log("About to create a GroupConv");
    ap.save(callback);
};

module.exports.findAGroupConv = (GroupConv, callback) => {
    // console.log('onMong');
    // console.log(GroupConv);
    GroupConv.findOne(GroupConv, callback);
}

