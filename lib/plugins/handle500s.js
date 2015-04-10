module.exports = {
    init: function() {
    },

    afterPhantomRequest: function(req, res, next) {
        var statusCode = parseInt(req.prerender.statusCode);
        if (statusCode >= 500 && statusCode <= 599) {
            var errorResp = {};
            errorResp.statusCode = statusCode;
            errorResp.parseStatus = req.prerender.status;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(errorResp));
        } else {
            next();
        }
    }
};
