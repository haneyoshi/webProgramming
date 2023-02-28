var http = require('http'),
     fs = require('fs');
var zip = require('zlib');

function serveStaticFile(response, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data) {
        if(err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 - Internal Error');
        } else {
            response.writeHead(responseCode,
                { 'Content-Encoding': 'gzip','Content-Type': contentType });
                
                //todo: compress the data that read from the source(path)

                //here print the data to console
                //process.stdout.write(data)
                 zip.gzip(data, (err, buffer)=>{
                     if(!err){
                         //! callback function
                        console.log("(callback) data zipped:\t" + contentType+'\n\n');
                        //! have to specify the data type by writing the header 'Content-Encoding': 'gzip'
                         response.end(buffer);
                         console.log('\n\ndata has been sent to the client\n\n\n\n');
                     }
                     else{
                         console.log('error occurred');
                     }
                 });
                console.log('\n\n********************** zipping **********************\n');
                //! this will output to console first, once the compressing process is done, the callback function will triger

            //send the zipped data to client
            
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
