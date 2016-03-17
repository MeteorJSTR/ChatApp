if(Meteor.isServer)
{
	Meteor.publish('Room',function () {
		return Room.find();
	});	

	Meteor.publish('Post',function (id) {
		return Post.find();
	});	
}
