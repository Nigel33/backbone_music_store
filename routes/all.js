let express = require('express');
let router = express.Router();
let path = require('path');
route_files = ['index', 'albums'];

for (var i = 0; i < route_files.length; i++) {
	require(path.resolve(path.dirname(__dirname), "routes/" + route_files[i]))(router);
}

module.exports = router;

