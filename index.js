var listener = require("contentful-webhook-listener");

const Contentful = require('./db.js');

const Apiai = require('./apiai.js');

const Axios = require('axios');

const util = require('util');

const Vuforia  = require('./vuforia.js')

var webhook = listener.createServer({
}, function requestListener (request, response) {

	console.log("request received");

});
const port = process.env.PORT || 8080;

webhook.on("publish", function (payload) {
	let id, obj, ApiaiConfig;
	obj = payload.fields;
	console.log(payload);

	switch( payload.contentType ){
		case 'artist':
			id = Apiai.artistEntityId
			let name = obj.firstName['fr-FR'] ? obj.firstName['fr-FR'] + " " + obj.lastName['fr-FR']  : obj.lastName['fr-FR']
			ApiaiConfig = {
				url: Apiai.url + 'entities/' + id + '/entries' + Apiai.version,
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Apiai.devToken
				},
				data: '[{"value": "' + name + '"}]'
			};
			break;
		case 'artwork': // GO SEND IMAGE TO VUFORIA
			id = Apiai.artworkEntityId

			if(obj.images['fr-FR']) {
				obj.images['fr-FR'].forEach(e => {
					const id = e.sys.id;

					console.log("Image id", id);

					Contentful.getAsset(id)
					.then( response => {
						let uniqId = obj.slug['fr-FR'] + '_' + id;
						//CHAR LIMIT ON VUFORIA
						if( uniqId.length > 64 ){
							const splitAt = index => it =>
  							[it.slice(0, index), it.slice(index)]

							const truncatedId = splitAt(64)(uniqId)
							uniqId = truncatedId[0]
						}
						console.log(uniqId);
						Vuforia.addTarget( uniqId, 'https:' + response.fields.file.url )
					})
					.catch( err => {
						console.log("ERROR CONTENTFUL GETTING ASSET", err);
						console.log(err);
					});
				});
			}
			ApiaiConfig = {
				url: Apiai.url + 'entities/' + id + '/entries' + Apiai.version,
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Apiai.devToken
				},
				data: '[{"value": "' + obj.title['fr-FR'] + '"}]'
			};
			break;
		case 'movement':
			id = Apiai.movementEntityId
			ApiaiConfig = {
				url: Apiai.url + 'entities/' + id + '/entries' + Apiai.version,
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + Apiai.devToken
				},
				data: '[{"value": "' + obj.name['fr-FR'] + '"}]'
			};
			break;
	}

	Axios(ApiaiConfig)
	.then(response => {
		console.log("@#@#@#@#@#@#@#@@@#@#@#@#@#@#@#@#@#@#@#@#@#@@#@#@#@#@#@#@#@#@#@@@#@#@#@#@#@#@#@#@#@#@#@#@#@@#@#");
		console.log(response.data.status.errorType);
		console.log(response.data);
	})
	.catch( err => {
		console.log("ERROR ADDING TO API.AI ENTITY", err);
		console.log(err);
	});

});

webhook.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});
