var listener = require("contentful-webhook-listener");
var webhook = listener.createServer({
}, function requestListener (request, response) {

	console.log("request received");

});
const port = process.env.PORT || 8080;

webhook.on("ContentManagement.Entry.publish", function (payload) {

	console.log(payload);

});

webhook.listen(port, function(){
	console.log('Contentful webhook server running on port ' + port)
});