Room = new Mongo.Collection('Room');

Post = new Mongo.Collection('Post');




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
        return Room.find({
          ids:{
            $in: [ Meteor.userId() ]
          } 
        });
    }

});

if (Meteor.isServer) {
 	lib = {
    lists:function (src,key) {
      var collection = [];
      for (var i = 0; i < src.length; i++) {
        var element = src[i];
        collection.push(element[key]);
      }
      return collection;
    }
  }

  Meteor.publish('Room',function () {
 		return Room.find();
 	});

  Meteor.methods({
    create_room:function (user_names) {
      user_names = user_names.split(',');
      var collection = [];
      for (var i = 0; i < user_names.length; i++) {
        u = user_names[i];

        var user = Meteor.users.findOne({
          username:u
        });
        
        collection.push(user);
      }
      
      var ids = lib.lists(collection,'_id');
      ids.push(Meteor.userId());
      console.log(ids);
      var names = lib.lists(collection,'username').join(' & ') + ' & ' + Meteor.user().username;
      Room.insert({
          ids : ids,
          name : names
        })
    }
  });


	
}

if (Meteor.isClient) {


    /**
     * Kayıtları kullanıcı adı üzerinden almak için.
     */
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });


    // Initialize app
  var myApp = new Framework7();

  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;

  // ...

  Session.set('id', 1);
  
  Template.layout.helpers({
  	'state':function (i) {
  		return Session.get('id') == i;
  	}
  });

  Template.roomIndex.onRendered(function () {
	  $$('.plus').on('click',function () {
      Session.set('id', 2);
	  })
   });


Meteor.subscribe('Room');
  Template.roomIndex.helpers({
  	'rooms':function () {
  		return Meteor.user().rooms();
  	}
  });




    //..
    $(document).on('click','.main', function () {

        console.log("Main clicked");
        Session.set('id', 1);
    });
    //..



  Template.roomIndex.events({
  	'rooms':function () {
  		return Meteor.subscribe('Room');
  	}
  });

    Template.createRoom.events({
        // When form submitted
       'submit form': function (event) {

           // Kill submit event
           event.preventDefault();

           var peer_name = event.target.peer_name.value;

           //console.log(peer_name);

           // Call meteor method by name
           Meteor.call('create_room',peer_name);

           // Clear peer name input's value
           event.target.peer_name.value = "";
       }
    });
}