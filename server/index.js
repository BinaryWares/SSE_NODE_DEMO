const http = require("http");
var os = require("os");

const host = "127.0.0.1";
const port = 8080;


// A simple dataSource that changes over time
let dataSource = 0;
const updateDataSource = () => {
  const delta = Math.random();
  dataSource += delta;
}


const requestListener = function (req, res) {
  if (req.url === '/ticker') {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      const data = JSON.stringify({ ticker: dataSource });
      res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
    }, 1000);
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  setInterval(()=> updateDataSource(), 500);
  console.log(`server running at http://${host}:${port}`);
});
