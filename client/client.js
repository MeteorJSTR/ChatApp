if (Meteor.isClient) {


    /**
     * Kayıtları kullanıcı adı üzerinden almak için.
     */
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });


  
  
  


  Meteor.subscribe('Room');
  Meteor.subscribe('Post',Session.get('roomId'));
  





    //..
    $$(document).on('click','.main', function () {

        console.log("Main clicked");
        Session.set('id', 1);
    });
    //..


   
}