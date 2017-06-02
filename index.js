var listener = require("contentful-webhook-listener");
var webhook = listener.createServer(function requestListener (request, response) {

	console.log("request received");

});
var port = 5000;

webhook.on("publish", function (payload) {

	console.log(payload);

});

webhook.listen(port, function callback () {

	console.log("server is listening");

});