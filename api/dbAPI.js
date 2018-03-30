const PrivateConv = require('../models/PrivateConv');
const GroupConv = require('../models/GroupConv');
const ChannelConv = require('../models/ChannelConv');

const UserData = require('../models/UserDataMongo');
const ConvItemBasic = require('../models/ClassModels/ConvItemBasic');
const UserBasic = require('../models/ClassModels/UserBasic');
const MessageBasic = require('../models/ClassModels/MessageBasic');

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

const senderToUserBasic = (id, callback) => {

    UserData.findById(id, callback)

}
const UserBasicInfo = (id) => {
    //accepts user ID and returns basic use info
    console.log("userBAsicInfo ", id);
    return new Promise((resolve, reject)=>{
        UserData.findById(id, (err, user)=>{
            if(err) return reject(err);
            var a = {
                id: user._id,
                name: user.firstName,
                profPic: user.profilePic
            };
            resolve(new UserBasic(user._id, user.firstName, user.profilePic,user.online));
        })
    });
}
const findAllPrivateLists = (privateList, myId) => {
    return new Promise((resolve, reject) => {
        var len = privateList.length;
        var list = []
        privateList.forEach((conv, index) => {
            PrivateConv.findById(conv,
                (err, convitem) => {
                    //choose the other id and grab his basic info
                    UserBasicInfo(
                        convitem.participants.filter(function (c) { return c != myId })[0]
                    )
                    .then((basicData)=>{
                        console.log('--------basic-data----------');
                        console.log(basicData);
                        //converting the privateConv into readable convItem
                        var msg = convitem.lastMsg;
                        var e = new ConvItemBasic(
                            convitem._id,
                            basicData.name,
                            basicData.profPic, 
                            convitem.participants,
                            new MessageBasic(msg._id, msg.body, basicData, msg.timeStamp), 
                            12,
                            "privateConv"
                        );
                        list.push(e);
                        if (len - 1 == index) {
                            resolve(list);
                        }
                    });
                    
                })
        });
    });

}
const findAllGroupLists = (groupLists) => {
    return new Promise((resolve, reject) => {
        var len = groupLists.length;
        var list = []
        groupLists.forEach((conv, index) => {
            GroupConv.findById(conv,
                (err, convitem) => {
                    var msg = convitem.lastMsg;
                    var e = new ConvItemBasic(convitem._id,
                         convitem.name,
                         convitem.profilePic,
                         convitem.participants,
                         new MessageBasic(msg._id, msg.body,
                             new UserBasic(convitem._id,convitem.name,convitem.profilePic, false, msg.timeStamp),msg.timeStamp),
                         9,
                         "groupConv"
                    );
                    list.push(e);
                    if (len - 1 == index) {
                        resolve(list);
                    }
                })
        });
    });
}

const findAllChannelLists = (channelLists) => {
    return new Promise((resolve, reject) => {
        var len = channelLists.length;
        var list = []
        channelLists.forEach((conv, index) => {
            ChannelConv.findById(conv,
                (err, convitem) => {
                    var msg = convitem.lastMsg;
                    var e = new ConvItemBasic(
                        convitem._id,
                        convitem.name,
                        convitem.profilePic,
                        convitem.subscribers,
                        new MessageBasic(msg._id, msg.body,
                            new UserBasic(convitem._id, convitem.name, convitem.profilePic, false, msg.timeStamp), msg.timeStamp),
                        9,
                        "channelConv"
                    );
                    list.push(e);
                    if (len - 1 == index) {
                        resolve(list);
                    }
                })
        });
    });
}

exports.getConvList = (req, res, next) => {
    console.log('getCovList---------------');
    console.log(req.query['id']);
    var list = []
    //starting to query list of (group, private, channel) with the given userID
    return new Promise(function (resolve, reject) {
            UserData.findById(req.query['id'], (err, userData) => {
                if (err) reject(err);
                //found the user
                console.log('====================================================');
                console.log('hey there IM ', userData.firstName);
                console.log('====================================================');
                resolve(userData);
            });
        })
        .catch((err)=>{
            console.log('sad is it not');
            res.send('cudnt found');
        })
        //got the User then do grab lists and return private, group, conv order
        .then((userData) => {
            return new Promise(function (resolve, reject) {
                console.log('on the second promise');
                console.log(userData.groupConvList);
                //passing required user data  eg. all the lists
                //the user ID that required in privateList operation
                resolve([
                    userData._id,
                    userData.privateConvList,
                    userData.groupConvList,
                    userData.channelConvList
                ]);
            })
        })
        //we got all this lists let's do search
        .then((convLists) => {
            console.log("the guy ID ", convLists[0]);
            var allLists = []
            //findAllPrivateLits accepts two params (@privateConvIDlists, @myID)
            //@myID is required to resolve the other user basic info (photo, name) so that 
            //then it can easly be converted to ready to use ConvItemBasics
            findAllPrivateLists(convLists[1], convLists[0])
                .then((allPrivateLists) => {
                    console.log('[--------------------private list----------------] ');
                    allLists.push(allPrivateLists);
                    // console.log(allLists)
                    return findAllGroupLists(convLists[2])
                })
                //gathered all conv's in private
                .then((allGroupLists) => {
                    console.log('[--------------------group list----------------] ');
                    allLists.push(allGroupLists);       
                    // console.log(allLists);  
                    return findAllChannelLists(convLists[3])           
                })
                //gathered all conv's in group
                .then((allChannelLists) => {
                    console.log('[--------------------channel list----------------] ');
                    allLists.push(allChannelLists);
                    console.log('final list')
                    var e = allLists[0].concat(allLists[1]).concat(allLists[2]);
                    console.log(e);
                })
            res.send('hahaa');
            // console.log("privateConv ", convLists[0]);
            // console.log("group ", convLists[1]);
            // console.log("channel ", convLists[2]);
            // res.send(convLists);
        });




    return;
    UserData.findById(req.query['id'], (err, userData) => {
        if (err) return console.log(err);
        // console.log(userData['convId']);
        // console.log(len);
        // var len = userData['convId'].length;
        console.log(userData);
        return
        //iterating to each conversatonItems
        userData['convId'].forEach((conv, index) => {
            Conversation.findAConversationById(conv,
                (err, convitem) => {
                    if (err) return console.log("error");
                    // var a = new ConvItemBasic();
                    console.log('conversation ----------------------')
                    //converting senderID to UserBasic Object
                    // console.log(Object.values(convitem));   
                    var lstMsg = convitem.lastMsg;
                    senderToUserBasic(convitem.lastMsg.senderID, (err, userbasic) => {
                        if (err) return console.log(err);
                        var user = new UserBasic(userbasic._id, userbasic.firstName, userbasic.profilePic, userbasic.online);
                        var msg = new MessageBasic(lstMsg._id, lstMsg.body, user, lstMsg.timeStamp);
                        var convItem = new ConvItemBasic(convitem._id, convitem.name, convitem.profilePic,
                            convitem.participants, msg, convitem.unreadCount, convitem.type
                        );
                        list.push(convItem);
                        console.log('pusehd------------');
                        if (len - 1 == index) {
                            //send when it's userbasic
                            res.send(list);
                        }
                    });
                });
            // res.json(ss);
        });

    })
};