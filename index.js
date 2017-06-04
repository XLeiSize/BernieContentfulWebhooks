var listener = require("contentful-webhook-listener");

const Contentful = require('./db.js');

const util = require('util');

var webhook = listener.createServer({
}, function requestListener (request, response) {

	console.log("request received");

});
const port = process.env.PORT || 8080;

webhook.on("publish", function (payload) {

	console.log(util.inspect(payload, false, null));

	const obj = payload.fields;

	if(obj.images['fr-FR']) {
		obj.images['fr-FR'].forEach(e => {
			const id = e.sys.id;

			console.log("Image id", id);

			Contentful.getAsset(id)
			.then( response => {
				console.log(response);
			})
			.catch( err => {
				console.log(err);
			});
		});
	}

});

webhook.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});