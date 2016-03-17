  // Initialize app
  var myApp = new Framework7();

  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;

  // prepare for first view

  Session.set('id', 1);
  

Template.layout.helpers({
  	'state':function (i) {
  		return Session.get('id') == i;
  	}
  });

  Template.roomIndex.helpers({
    'rooms':function () {
      return Meteor.user().rooms();
    }
  });
  Template.roomShow.helpers({
    'messages':function () {
        return Post.find({
          roomId:Session.get('roomId')
        })
    },
    'is_mine':function (i) {
      return i == Meteor.userId();
    }

  });

  Template.layout.onRendered(function () {
    $$('.main').on('click',function(event) {
      Session.set('id', 1);
    });
  })

  Template.roomIndex.onRendered(function () {
	  $$('.plus').on('click',function () {
      Session.set('id', 2);
    })

    $$(document).on('click','.room',function () {
      var roomId = $$(this).data('id');
      console.log(roomId);
      Session.set('id', 2);
      Session.set('roomId', roomId);
	  })

   });


  Template.roomShow.onRendered(function() {
        // When form submitted
        $('.send').click(function(event) {
          // Kill submit event
           event.preventDefault();

           var message = $('#message').val();

           //console.log(peer_name);

           // Call meteor method by name
           Meteor.call('send_message',message,Session.get('roomId'));

           // Clear peer name input's value
           $('#message').val('');
        });
       
    });
