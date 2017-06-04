// Create webhook server
var server = require('contentful-webhook-server')();

const util = require('util')

// Handler for all successful requests
// Is not emitted when an error occurs
server.on('ContentManagement.Entry.publish', function(req){

	// topic is available as string
	// console.log('Request: ', util.inspect(req, {showHidden: false, depth: null}))
	console.log('Request: ', util.inspect(Object.keys(req.client), {showHidden: false, depth: null}))
	let body = "";

	request.on("data", function (chunk) {

		body += chunk.toString();

	});

	// parse body
	request.on("end", function () {

		response.writeHead(200, "OK");

		try {

		  body = JSON.parse(body);

		  // emit event with webhook object
		  let webhook = {
			"contentType": body.sys.contentType && body.sys.contentType.sys.id,
			"fields": body.fields,
			"id": body.sys.id,
			"kind": kind,
			"origin": origin,
			"space": body.sys.space.sys.id,
			"sys": body.sys,
			"webhookName": webhookName
		  };
		  server.emit(event, webhook);

		} catch (err) {

		  server.emit("error", err);
		  server.close();

		}

		console.log(body);
		response.end();
	});

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