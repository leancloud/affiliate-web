var static = require('node-static');

var fileServer = new static.Server('.');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (e, res) {
      if (e && (e.status === 404)) { // If the file wasn't found
        fileServer.serveFile('/404.html', 404, {}, request, response);
      }
    });
  }).resume();
}).listen(parseInt(process.env.LC_APP_PORT || 3000, 10));
