var url = require("url");

module.exports = {
	init: function() {
        this.HEALTHCHECK_PATH = process.env.HEALTHCHECK_PATH || '/healthcheck';
    },
    beforePhantomRequest: function(req, res, next) {
        var uri = url.parse(req.url).pathname;
        if(this.HEALTHCHECK_PATH.indexOf(uri) > -1) {
            res.writeHeader(200);
            res.end('healthy');
        } else {
            next();
        }
    }
}