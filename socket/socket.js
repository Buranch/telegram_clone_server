const User = require('../models/UserMongo');
const onlineUsersData = require('./onlineuserdata');
const online = require('./onlineuser');

const MsgInConv = require('../models/MessageInConvMongo');
const Message = require('../models/MessageMongo');
const Conversation = require('../models/ConversationMongo');
const socket = (io, socket, id) => {
    console.log("Someone connected @socket.js");
    console.log("id ", socket.decoded_token);
    socket.on('connect', function (client) {
        console.log("Connect server side requested client");
        // console.log(client);
    });
    socket.on('urself', function () {
        console.log('me is: ');
        console.log(socket.id);
        // User.findAUser({_id: id}, (user)=>{
        //     console.log(user);
        //     // socket.emit('myselfis', )
        // });
    });
    socket.on('wow', (data) => {
        console.log('wow ');
        console.log(data);
    });

    socket.on('web', function (web) {

        console.log('wowwwwww web is connected');
        console.log(web);
    });

    socket.on('message', function (from, convID, msg) {
        console.log('msg recieved from ', from);
        console.log('saying ', msg);
        console.log('from userData');
        console.log(onlineUsersData[from]);

        var newMsg = new Message({
            senderID: from,
            conversationID: convID,
            timeStamp: Date.now(),
            body: msg
        });
        MsgInConv.addMsgToConv(convID, newMsg, (err, done) => {
            if (!err) {
                // console.log("Message pusshed");
                console.log('convID ---------------------');
                console.log(convID);
                // io.emit('message', from, msg);
                Conversation.findParticipants(convID, (err, done) => {
                    if (!err) {

                        console.log(online);
                        console.log('------done---------')
                        console.log(done);
                        console.log(done['participants'])
                        done['participants'].forEach((p)=>{
                            console.log('particpant ', p);
                            // console.log(typeof(online[p]));
                            if(online[p] != undefined){
                                console.log('send to ', online[p].socketId);
                                // io.to(online[p].socketId).emit('message', from, msg);
                                socket.to(online[p].socketId).emit('message', from,msg);
                            }
                            // console.log(a.socketId);
                        })
                        // io.emit('message', from, msg);
                    }
                    else {
                        console.log('couldnt find conv');
                    }
                });
            } else {
                console.log(err);
                return console.log('cant push')
            }
        });
    });

    socket.on('toweb', function (msg) {
        io.emit('toweb', msg);
    })
    socket.on('toandroid', function (msg) {
        io.emit('toandroid', msg);
    })
    socket.on('authenticate', function (msg) {
        console.log('sdflkj');
        console.log(msg);
    })

}

module.exports = socket;