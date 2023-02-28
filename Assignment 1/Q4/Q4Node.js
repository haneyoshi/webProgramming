
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
 * the this html(form) can apply to the css(under public file) without specifying "/public"
 */
app.use(express.static(__dirname+'/public'));

//body-parser middleware
app.use(require('body-parser').urlencoded({extended: true}));

/**
 * *some routes
 * no longer have to specify the content typ or status code,
 * the view egine will return a content type of text/html
 * and a status code of 200 by default
 */


//form:
app.get('/',function(req,res) { 
    //default layout is main.handlebars
    //set layout to null, we can use the html file structure itself
    res.render('form',{layout: null});
});

//triger sumit
app.post('/process-form',function(req,res){
    console.log(req.body);
    res.send(req.body);
    res.end();
})

//* error
//custom 404 page
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use(function(err,req,res,next){
    console.error(err.message);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), ()=> console.log(
    'Express started on http://localhost:'+app.get('port')+';press Ctrl -C to terminate.'
    ));