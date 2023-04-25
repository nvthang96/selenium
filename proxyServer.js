const http = require('http');
const httpProxy = require('http-proxy');

// const options = {
//   key: fs.readFileSync('/path/to/private.key'),
//   cert: fs.readFileSync('/path/to/certificate.crt')
// };

const proxy = httpProxy.createProxyServer({
  target: 'https://www.google.com',
  // agent: new http.Agent({  
  //   rejectUnauthorized: false
  // })
});

http.createServer( function (req, res) {
  console.log("request",req.socket.remoteAddress)
  proxy.web(req, res);
}).listen(8000);