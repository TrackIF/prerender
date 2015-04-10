#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT,
    followRedirect: process.env.FOLLOW_REDIRECTS || true,
    waitAfterLastRequest: process.env.REQUEST_WAIT || 2000,
    jsTimeout: process.env.JS_TIMEOUT || 20000,
    phantomArguments: [
      "--ignore-ssl-errors=true",
      "--ssl-protocol=tlsv1"
    ]
});


server.use(prerender.healthcheck());
server.use(prerender.loaderio());
// server.use(prerender.whitelist());
// server.use(prerender.blacklist());
server.use(prerender.basicAuth());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(prerender.overrideDefaultUserAgent());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());
server.use(prerender.handle500s());

server.start();
