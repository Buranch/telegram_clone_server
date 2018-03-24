var MsgInConv = require('./MessageInConvMongo');
var Message = require('./MessageMongo');

var up = () => {
    console.log('fuck')
    
    // MsgInConv.findMsgModify("query", new Message({
    //     senderID: "me",
    //     conversationID: "fuck you",
    //     body: "message in you",
    //     timeStamp: Date.now()
    // }), (err, done)=>{
    //     console.log('done updateing appending');
    // });
}
up();