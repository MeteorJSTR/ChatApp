if (Meteor.isClient) {
  // Initialize app
  var myApp = new Framework7();

  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;

  // ...
  var ptrContent = $$('.pull-to-refresh-content');
}