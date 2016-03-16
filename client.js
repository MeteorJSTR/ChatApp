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



  Template.roomIndex.events({
  	'rooms':function () {
  		Meteor.subscribe('Room');
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