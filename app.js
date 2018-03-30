const express = require('express')
const app = express()
const auth = require('./routes/auth')();
// var jwt = require('jsonwebtoken');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const UserRoute = require('./routes/users');
const db = require('./models/UserMongo');
//socket module
const sampleAPI = require('./api/sampleAPI');
const socketioJwt = require('socketio-jwt');
const User = require('./models/UserMongo');
const UserData = require('./models/UserDataMongo');
var socketer = require('./socket/socket');
var online = require('./socket/onlineuser');
var onlineUsersData = require('./socket/onlineuserdata');
var dbAPI = require('./api/dbAPI');
io.on('connection'
        , socketioJwt.authorize({
            secret: require('./routes/config').jwtSecret,
            timeout: 15000 // 15 seconds to send the authentication message
        }))
    .on('authenticated', function (socket) {
        console.log("---------Auth----------");
        //haha this place is amazing
        //you know I know the user mongoID
        //so I have all the info
        console.log('authencated');
        socketer(io, socket, socket.decoded_token);
        UserData.findAUser({
            userID: socket.decoded_token.userId
        }, (err, user) => {
            if (err) return console.log('cant find usr');
            // console.log('found user')
            // console.log(user);
            //this is just socket + userId + userDataID
    
            
            online[user['_id']] = {
                userID: socket.decoded_token.userId,
                socketId: socket.id
            }
            //this one stores each user's Data, _id is the key
            onlineUsersData[user['_id']] = user;
            console.log('===============onlineUserData=====================');
            console.log(onlineUsersData);
            console.log('=================online===================');
            console.log(online);
        });
    });

const headerFix = (req, res, next) => {
    // console.log(req.headers['authorization']);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type , Authorization, Accept");
    next();
};
app.use(headerFix);
app.use('/sample', sampleAPI);
app.use('/login', UserRoute);
app.use(express.static(path.join(__dirname, 'public')));

//accepts convId returns detail of that conv
app.get('/api/convId', dbAPI.getConversation);
//accepts userDataID return list of Conv of that user
app.get('/api/convlist', dbAPI.getConvList);


app.get('/dum', (req, res, next)=>{
    console.log('asked');
    // this.id = id;
    // this.name = name;
    // this.avatar = avatar;
    // this.online = online;

    var users = [
        {
            _id: "hi",
            name: "fuck",
            profPic: "nothing",
            participants: ["sdf", "abee"],
            lastMsg: {
                _id: 'od',
                text : 'text',
                user : 'user',
                timeStamp : Date.now()
            },
            unreadCount: 4,
            type: "GROUPPRIVETE"
        },
        {
            _id: "oowdoi",
            name: "fuck",
            profPic: "nothing",
            participants: ["sdf", "abee"],
            lastMsg: {
                _id: 'od',
                text: 'lst',
                user: {
                    id: "id",
                    name: "name",
                    avatar: "avater",
                    online: true
                },
                timeStamp: Date.now()
            },
            unreadCount: 4,
            type: "GROUPPRIVETE"
        },

    ]
    res.send(users);
});
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));


http.listen(9666, () => console.log('Example app listening on port 9666!'));