var Room = new Mongo.Collection('Room');
var Post = new Mongo.Collection('Post');


/**
 * Posts has room
 */
Post.helpers({

    room: function () {
        return Room.findOne(this.roomId);
    }
});

/**
 * Room has posts
 */
Room.helpers({

    posts: function () {
        return Post.find({ postId: this._id });
    }
});