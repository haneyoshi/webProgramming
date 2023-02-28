
var express = require('express');//npm install express
var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});//npm install express-handlebars
var app  = express();


/**
 * *configure Handlebars view engine
 * here to create a view engine and configures Express to use
 * as defalt. When we build a website, it can be tedious to 
 * rewrite all files.
 * todo: change main file => change all(views/layouts/main.handlebars)
 */
 app.engine('handlebars', handlebars.engine);
 app.set('view engine', 'handlebars');
 
//* this allows us to override the port by seting an environment variable before we  start the server
 app.set('port', process.env.PORT || 3000);



/**
 * *static middleware
 * allows to designate one or more directories as resources
 * to be delivered to the client without special handling
 * the main html can refer to the img(public file) without specifying public(/img/yushan.jpg)
 */
app.use(express.static(__dirname+'/public'));


/**
 * *some routes
 * no longer have to specify the content typ or status code,
 * the view egine will return a content type of text/html
 * and a status code of 200 by default
 */

//home:
app.get('/',function(req,res) { 
    res.render('home',{header: "Home"});
});

//about:
app.get('/about',function(req,res) { 
    res.render('about',{header: "About"});
});

//request headers
//some invisible infos that browser sends, every time you visit(e.g. the browser(user) prefers language)
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

//* error
//custom 404 page
app.use(function(req,res){
    res.status(404);
    res.render('404',{header: "Error 404"});
});

//custom 500 page
app.use(function(err,req,res,next){
    console.error(err.message);
    res.status(500);
    res.render('500', {Headers:"Error 500"});
});


app.listen(app.get('port'), ()=> console.log(
    'Express started on http://localhost:'+app.get('port')+';press Ctrl -C to terminate.'
    ));