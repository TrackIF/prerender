var url = require("url");

module.exports = {
	init: function() {
        this.LOADERIO_TOKEN = process.env.LOADERIO_TOKEN || '';
    },
    beforePhantomRequest: function(req, res, next) {
        var uri = url.parse(req.url).pathname.replace(/\//g,'');
        if(this.LOADERIO_TOKEN == uri) {
            res.writeHeader(200);
            res.end(this.LOADERIO_TOKEN.toString());
        } else {
            next();
        }
    }
}