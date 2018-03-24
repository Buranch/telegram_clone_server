const mongo = require('mongodb');
const mongoose = require('mongoose');
const Message = require('./MessageMongo');
var opts = {
    useMongoClient: true
};
mongoose.Promise = global.Promise;
// mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
mongoose.connect('mongodb://localhost/telegramclone', opts, (err, s) => {
    if (err) {
        console.log("error bappened connectin database");
    } 
    else {
        console.log("Database connection established!!");
    }
});
var db = mongoose.connection;
var MsgInConvSchema = mongoose.Schema({
    convID: String,
    messages: Array
}, {
    versionKey: false,
    id: false
});
MsgInConvSchema.set('toJSON', {
    virtuals: true
});

var MsgInConv = module.exports = mongoose.model("MsgInConv", MsgInConvSchema);

module.exports.createMsgInConv = (ap, callback) => {
    console.log("About to create a Conv");
    // var ap = new MsgInConv({
    //     convID: convID,
    //     messages: [new Message({
    //         senderID: from,
    //         conversationID: convID,
    //         timeStamp: Date.now(),
    //         body: msg
    //     })]
    // });
    ap.save(callback);
};
module.exports.getAllMsgOfConv = (id, callback) => {
    // console.log('onMong');
    // console.log(user);
    MsgInConv.findOne({convID: id}, callback);

}
module.exports.addMsgToConv = function (id, newMsg, callback) {
    console.log('------------addMsgToConv-----------');
    console.log('convID: ', id)
    console.log('newMsg');
    console.log(newMsg);
    MsgInConv.findOneAndUpdate(
        {convID: id}, {
            $push: {
                messages: newMsg
            }
        },callback);
}

// createMsgInConv('hull');