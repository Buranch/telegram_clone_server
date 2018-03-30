class ConvItemBasic{
        constructor(
            _id,
            name,
            profPic,
            participants,
            lastMsg,
            unreadCount,
            type
        ){
                this._id = _id,
                this.name = name,
                this.profPic = profPic,
                this.participants = participants,
                this.lastMsg = lastMsg,
                this.unreadCount = unreadCount,
                this.type = type
        }

}

module.exports = ConvItemBasic;
