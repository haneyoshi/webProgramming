var express = require('express'),
    handlebars = require('express-handlebars').create({defaultLayout: 'main'}),
    cookieParser = require('cookie-parser'),//npm install cookie-parser
    credentials = require('./credentials');//for verifying cookie

var app = express();
app.use(cookieParser(credentials.cookieSecret));//middleware

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.cookie('signed_cookie', '3133878SignedCookie', {signed: true, maxAge: 1204800400});
    //create cookies cookie(key, value,{...})
    //specify how long cookies will last
    res.render('home');
});

app.get('/cookieShow', function(req, res){
    var contextObj ={MySignedCookie: req.signedCookies.signed_cookie};//get cookies from client
    res.render('cookieShow', contextObj);//render the page includes the cookie
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});