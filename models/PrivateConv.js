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

var PrivateConv = mongoose.Schema({
    participants: Array,
    lastMsg: Object,
    messages: Array
},
    { versionKey: false, id: false }
);
PrivateConv.set('toJSON', { virtuals: true });
var PrivateConv = module.exports = mongoose.model("PrivateConv", PrivateConv);


module.exports.createPrivateConv = (ap, callback) => {
    var ap = new PrivateConv({
        participants: [
            "5aa63641567d43e6f42f8ad9",
            "5aa4f2bf26051827082b0296"
        ],
        lastMsg: new Message({
            senderID: "5aa4f2bf26051827082b0296",
            conversationID: "5aa532ab52c5dd1cd48ff078",
            timeStamp: Date.now(),
            body: "wowwowwww lol."
        }),
        messages: [new Message({
            senderID: "5aa4f2bf26051827082b0296",
            timeStamp: Date.now(),
            body: "Hello How are you",
            seen:false
        }), new Message({
            senderID: "5aa63641567d43e6f42f8ad9",
            timeStamp: Date.now(),
            body: "Hi Hi",
            seen: false
        })]
    });
    console.log("About to create a PrivateConv");
    ap.save(callback);
};

module.exports.findAPrivateConv = (PrivateConv, callback) => {
    // console.log('onMong');
    // console.log(PrivateConv);
    PrivateConv.findOne(PrivateConv, callback);
}

