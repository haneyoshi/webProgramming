var express =require('express');//npm install express
var routes = require('./routes');//
var http = require('http');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:false});//npm install express-handlebars

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/public'));

app.get('/', routes.api);

http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port'+ app.get('port'));
})