const http = require('http');
const app = require('./app');
var fs = require('fs');

/*function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html',null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found');
        } else {
            response.write(data);
        }
        response.end();
    });
} */

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);