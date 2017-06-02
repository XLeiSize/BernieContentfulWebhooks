var listener = require("contentful-webhook-listener");
var webhook = listener.createServer(function requestListener (request, response) {

	console.log("request received");

});
var port = 5000;

webhook.on("ContentManagement.Entry.publish", function (payload) {

	console.log("publish that shit adele", payload);

});

webhook.on("ContentManagement.Entry.save", function (payload) {

	console.log("adele save this other side", payload);

});

webhook.on("ContentManagement.Entry.autoSave", function (payload) {

	console.log("omg adele stop spam adele", payload);

});

webhook.listen(port, function callback () {

	console.log("server is listening");

});