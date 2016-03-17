Room = new Mongo.Collection('Room');

Post = new Mongo.Collection('Post');




/**
 * Posts has room
 */
Post.helpers({
    room: function () {
        return Room.findOne(this.roomId);
    },
    user:function () {
      return Meteor.users.findOne({ _id : this.user_id});
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
        return Room.find({
          ids:{
            $in: [ Meteor.userId() ]
          } 
        });
    },
    posts:function () {
        return Post.find({
          user_id:Meteor.userId()
        })
    }


});