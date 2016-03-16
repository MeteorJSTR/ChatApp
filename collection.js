var Room = new Mongo.Collection('Room');

var Post = new Mongo.Collection('Post');

//Room.insert({user_id:"XjDtzyqX8WHDJcSTv",name:"TestRoom",status:0});

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
    },

    user: function () {
        return Meteor.users.findOne({_id:this.user_id});
    }
});

Meteor.users.helpers({

    /**
     * One To Many
     * Kullanıcının odaları
     * @returns {Cursor}
     */
    rooms: function () {
        return Room.find({userId:Meteor.userId()});
    }

});
