// Create webhook server
var server = require('contentful-webhook-server')();

// Handler for all successful requests
// Is not emitted when an error occurs
server.on('ContentManagement.*', function(topic, req){

	// topic is available as string
	// => e.g. ContentManagement.Asset.unpublish
	console.log('Request came in for: ' + topic);
	console.dir('Data retrieved: ' + req);

	if(req.contentType == 'artwork') {
		const artwork = req.fields;
		if(artwork.images) {
			for (var i = 0; i < artwork.images.length; i++) {
				const image = artwork.images[i].fields.file
				console.log(image);
			}
		}
	}
});

// Start listening for requests on port 3000
const port = process.env.PORT || 8080;
server.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});