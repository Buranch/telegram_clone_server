class MessageBasic {
    constructor(_id, text,
        user,
        timeStamp) {
        this._id = _id;
        this.text = text;
        this.user = user;
        this.timeStamp = timeStamp;
    }
}
module.exports = MessageBasic;


