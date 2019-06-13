const http = require('http');
const argv = require('minimist')(process.argv.slice(2));

const config = {
  timeout: Number(process.env.LOFT_SERVER_TIMEOUT) || 5,
  delta: Number(process.env.LOFT_SERVER_DELTA) || 1
};

let isRunning = false;

if (config.timeout < config.delta) {
  console.log(`Timeout value should be greater than delta time.`);
  process.exit(1);
}

const currentTime = () => {
  const time = new Date(new Date().toUTCString());
  return time;
};

const renderDate = (res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.write(`Current time: ${currentTime()}`);
  res.end();

  isRunning = false;
  console.log('Sent content to client.');
};

const delay = () => {
  setTimeout(() => {
    if (!isRunning) {
      return;
    }
    console.log(currentTime());
    delay();
  }, config.delta * 1000);
};

console.log(`Starting server with LOFT_SERVER_TIMEOUT: ${config.timeout}s, LOFT_SERVER_DELTA: ${config.delta}s.`);

http.createServer(function (req, res) {
  console.log('Client sent request.');
  isRunning = true;
  setTimeout(renderDate.bind(this, res), config.timeout * 1000);
  delay();
}).listen(8080);
