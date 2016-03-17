 

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


 
  
