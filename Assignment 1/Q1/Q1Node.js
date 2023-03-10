var http = require('http'),
    fs = require('fs');

function serveStaticFile(response, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data) {
        if(err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 - Internal Error');
        } else {
            response.writeHead(responseCode,
                { 'Content-Type': contentType });
            response.end(data);
        }
    });
}

http.createServer(function(request,response){
    // normalize url by removing querystring, optional
    // trailing slash, and making it lowercase
    var path = request.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            serveStaticFile(response, '/public/home.html', 'text/html');
            break;
            
        case '/about':
            serveStaticFile(response, '/public/about.html', 'text/html');
            break;
        case '/img/yushan.jpg':
            serveStaticFile(response, '/public/img/yushan.jpg', 'image/jpeg');
            break;

        default:
            serveStaticFile(response, '/public/notfound.html', 'text/html',
                404);
            break;
    }
}).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
