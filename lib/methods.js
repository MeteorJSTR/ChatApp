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
    },

    send_message:function (message,id) {
      Post.insert({
        roomId:id,
        post:message,
        user_id:Meteor.userId()
      });
      console.log('comment added');

    }

  });


	
}
