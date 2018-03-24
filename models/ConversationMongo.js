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

var ConversationSchema = mongoose.Schema({
    name: String,
    participants: Array,
    pic: String,
    lastMsg: String
},
    { versionKey: false, id: false }
);
ConversationSchema.set('toJSON', { virtuals: true });
var Conversation = module.exports = mongoose.model("Conversation", ConversationSchema);

module.exports.createConversation = (ap, callback) => {
    
    console.log("About to create a Conv");
    ap.save(callback);
};
module.exports.findAConversationById = (convId, callback) => {
    // console.log('onMong');
    // console.log(user);
    Conversation.findById(convId, callback); 
}
module.exports.findParticipants = (convID, callback) => {
    Conversation.findById(convID, callback);
}

// editPar = () => {
//     Conversation.findOneAndUpdate(
//         { _id: "5aa5674d50874730fc5fc4dd" }, {
//             $set: {
//               participants: ["5aa4f2bf26051827082b0296", "5aa4f04bd46b9d1d24a1465f"] 
//             }
//         }, (err, done)=>{
//             if(!err) console.log('succ');
//             console.log(err);
//         });
// }
// editPar()
