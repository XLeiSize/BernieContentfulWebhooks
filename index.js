var listener = require("contentful-webhook-listener");

const Contentful = require('./db.js');

const Apiai = require('./apiai.js');

const Axios = require('axios');

const util = require('util');

var webhook = listener.createServer({
}, function requestListener (request, response) {

	console.log("request received");

});
const port = process.env.PORT || 8080;

webhook.on("publish", function (payload) {

	console.log(util.inspect(payload, false, null));
	if(payload.contentType == 'artwork') {
		const obj = payload.fields;

		if(obj.images['fr-FR']) {
			obj.images['fr-FR'].forEach(e => {
				const id = e.sys.id;

				console.log("Image id", id);

				Contentful.getAsset(id)
				.then( response => {
					const uniqId = obj.slug['fr-FR'] + '_' + id;
					console.log(uniqId);
					// PUT VUFORIA CALL HERE
				})
				.catch( err => {
					console.log(err);
				});
			});
		}

		const ApiaiConfig = {

			url: Apiai.url + 'entities/' + Apiai.artworkEntityId + '/entries' + Apiai.version,

			method: 'post',

			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Apiai.devToken
			},

			data: '[{"value": "' + obj.title + '"}]'
		};

		Axios(ApiaiConfig)
		.then(resp => {
			console.log(response);
		})
		.catch( err => {
			console.log(err);
		});
	}
});

webhook.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});