if(Meteor.isServer)
{
	Meteor.publish('Room',function () {
		return Room.find();
	});	

	Meteor.publish('Post',function (id) {
		return Post.find();
	});	
	Meteor.publish('User',function (id) {
		return Meteor.users.find();
	});	
}
