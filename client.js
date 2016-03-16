if (Meteor.isClient) {
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
  })

  Template.roomIndex.onRendered(function () {
	  $$('.plus').on('click',function () {
      Session.set('id', 2);
	  })
   });

  

  Template.roomIndex.events({
  	'rooms':function () {
  		Meteor.subscribe('Room');
  	}
  })


}