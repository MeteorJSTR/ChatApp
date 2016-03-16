if (Meteor.isServer) {
 	Meteor.publish('Room',function () {
 		return Room.find();
 	})
}