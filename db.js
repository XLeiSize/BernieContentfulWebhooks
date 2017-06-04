const contentful = require('contentful');

module.exports = contentful.createClient({
	space: 'zcddnywxuf0y',

	// Preview API
	host: 'preview.contentful.com',
	accessToken: 'b7f7acd4d96b158b51d9414cbf710d2422e7eb83d8406e0260dcfcff28ba7bbc'

	// Content API
	// host: 'cdn.contentful.com',
	// accessToken: 'e1eb11d7f2a8120de8f24d0b30e0e5e80f7e61002c7a37ea005847c37f23b318'
});