class MessageBasic {
    constructor(_id, body,
        user,
        time) {
        this._id = _id;
        this.text = body;
        this.time = time;
        // this.seen = seen;
        //here this.user should be used instead of seen, since 
        //the Java Message Class require User Model
        /*
         public Message(String id, User user, String text, long timeStamp) {
            this._id = id;
            this.text = text;
            this.user = user;//User object
            this.timeStamp = timeStamp;
        }
        */
        this.user = user;
    }
}
module.exports = MessageBasic;
