var http = require('http');
http.createServer(function(req, res) {
  console.log('Time server running');
}).listen(8080);