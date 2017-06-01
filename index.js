// Create webhook server 
var server = require('contentful-webhook-server')({
	path: '/',
	username: 'user',
	password: 'pass'
});
 
// Attach handlers to Contentful webhooks 
server.on('ContentManagement.ContentType.publish', function(req){
	console.log('A content type was published!');
});
 
// Start listening for requests on port 3000 
server.listen(3000, function(){
	console.log('Contentful webhook server running on port ' + 3000)
});