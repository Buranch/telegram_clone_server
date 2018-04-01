//hello this is a comment///
const Conversation = require('../models/ConversationMongo');
const UserData = require('../models/UserDataMongo');
exports.getConversation = (req, res, next) => {
    //expects 
    //http://localhost:8999/api/problems
    console.log('getConversatoin---------------');
    console.log(req.query['id']);
    // return;
    Conversation.findAConversationById(req.query['id'], (err, data) => {
        if (err) return console.log("error");
        // console.log(data);
        // console.log('-------------getConversation----------------');
        // console.log(data);
        res.send(data);
    });
    // res.json(ss);
}; 

exports.getConvList = (req, res, next) => {
    console.log('getCovList---------------');
    console.log(req.query['id']);
    var list = []
    UserData.findById(req.query['id'], (err, done)=>{
        if(err) return console.log(err);
        console.log(done);
        console.log(done['convId']);
        // console.log(len);
        var len = done['convId'].length;
        done['convId'].forEach((conv, index)=>{
            Conversation.findAConversationById(conv, 
                (err, data) => {
                    if (err) return console.log("error");
                    console.log(data);
                    list.push(data);
                    if(len - 1 == index ){
                        res.send(list);
                    }
                });
                // res.json(ss);
            }
        );
    })
};