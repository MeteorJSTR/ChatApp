if (Meteor.isServer) {
 	Meteor.publish('Room',function () {
 		return Room.find();
 	});


	Meteor.methods({

		'create_room': function (peer_name) {

			console.log(Meteor.users.findOne({'username':username}));

		}
	})
}