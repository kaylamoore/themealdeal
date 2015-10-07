$(function (){
  var socket = io();

  socket.on( 'connect', function() {
    console.log( 'Connected!' );


	event.preventDefault();
    var search_term = "obama";
    socket.emit( 'updateTerm', search_term );
	console.log( 'Searching for: ' + search_term );
  });

  socket.on( 'tweets', function( tweet ) {
    var html = '<div class="row"><div class="col-md-6 col-md-offset-3 tweet"><img src="' + tweet.user_profile_image + '" class="avatar pull-left"/><div class="names"><span class="full-name">' + tweet.name + ' </span><span class="username">@' +tweet.screen_name + '</span></div><div class="contents"><span class="text">' + tweet.text + '</span></div></div></div>';
    $( '#tweet-container' ).prepend( html );
  });

  // $(document).on('click', function(){
  //   event.preventDefault();
  //   var search_term = "obama";
  //   socket.emit('updateTerm', search_term);
  // });

  // socket.on('updatedTerm', function(searchTerm) {
  //   $('h1').text("Twitter is searching for "+ searchTerm);
  //   console.log(searchTerm);
  // });

});
