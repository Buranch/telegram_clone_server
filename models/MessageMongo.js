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
var MessageSchema = mongoose.Schema({
    senderID: String,
    conversationID: String,
    body: String,
    timeStamp: Number
},
    { versionKey: false, id: false }
);
MessageSchema.set('toJSON', { virtuals: true });
var Message = module.exports = mongoose.model("Message", MessageSchema);
module.exports.createMessage = (ap, callback) => {
    var ap = new Message({
        senderID: "5aa4f2bf26051827082b0296",
        conversationID: "5aa532ab52c5dd1cd48ff078",
        timeStamp: Date.now(),
        body: "wowwowwww lol."
    })
    console.log("About to create a Message");
    ap.save(callback);
};

module.exports.findAMessage = (Message, callback) => {
    // console.log('onMong');
    // console.log(Message);
    Message.findOne(Message, callback);

}
