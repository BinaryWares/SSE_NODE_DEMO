const http = require("http");

const host = "127.0.0.1";
const port = 8080;

const requestListener = function (req, res) {
  switch (req.url) {
    case "/stream":
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Stream route</h1>')
      break;
    default:
      res.statusCode = 404;
      res.end("resource does not exist");
      break;
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});
