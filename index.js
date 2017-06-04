var listener = require("contentful-webhook-listener");

const util = require('util');

var webhook = listener.createServer({
}, function requestListener (request, response) {

	console.log("request received");

});
const port = process.env.PORT || 8080;

webhook.on("publish", function (payload) {

	console.log(util.inspect(payload, false, null));

});

webhook.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});