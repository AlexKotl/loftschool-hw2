const http = require('http');
var argv = require('minimist')(process.argv.slice(2));

const config = {
  timeout: argv.t || 5,
  delta: argv.d || 1,
}

const currentTime = () => {
  time = new Date(new Date().toUTCString());
  return time;
}

const renderDate = (res) => {
  res.writeHead(404, {
      'Content-Type': 'text/plain; charset=utf-8'
  });
  res.write(`Current time: ${currentTime()}`);
  res.end();
};

console.log(`Starting server with timeout: ${config.timeout}s, delta: ${config.delta}s. 
  Usage:
  -t: set timeout for request
  -d: delta time for time output`);

http.createServer(function(req, res) {
  renderDate(res);
}).listen(8080);