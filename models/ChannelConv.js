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

var ChannelConvSchema = mongoose.Schema({
    name: String,
    profilePic: String,
    bio: String,
    creator: String,
    subscribers: Array,
    lastMsg: Object,
    messages: Array
},
    { versionKey: false, id: false }
);
ChannelConvSchema.set('toJSON', { virtuals: true });
var ChannelConv = module.exports = mongoose.model("ChannelConv", ChannelConvSchema);


module.exports.createChannelConv = (ap, callback) => {
    var ap = new ChannelConv({
        subscribers: [
            "5aa63641567d43e6f42f8ad9",
            "5aa4f2bf26051827082b0296"
        ],
        name: "Shower Thoughts",
        profilePic: "/about.jpg",
        creator: '5aa63641567d43e6f42f8ad9',
        bio: "A show of toughts",
        lastMsg: new Message({
            senderID: "5aa4f2bf26051827082b0296",
            conversationID: "5aa532ab52c5dd1cd48ff078",
            timeStamp: Date.now(),
            body: "last Msg"
        }),
        messages: [new Message({
            senderID: "5aa4f2bf26051827082b0296",
            conversationID: "5aa532ab52c5dd1cd48ff078",
            timeStamp: Date.now(),
            body: "last Msg"
        })]
    });
    console.log("About to create a ChannelConv");
    ap.save(callback);
};

module.exports.findAChannelConv = (ChannelConv, callback) => {
    // console.log('onMong');
    // console.log(ChannelConv);
    ChannelConv.findOne(ChannelConv, callback);
}

