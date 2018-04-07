class MessageBasic {
    constructor(_id, body,
        seen,
        time) {
        this._id = _id;
        this.body = body;
        this.time = time;
        this.seen = seen;
    }
}
module.exports = MessageBasic;
