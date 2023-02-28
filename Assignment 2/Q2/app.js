var express =require('express');//npm install express

const pagesMiddleware = require('./lib/middleware/page.js');
var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout:"main",
  helpers: { 
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
}});//npm install express-handlebars

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//all environments
//app.set('port', process.env.PORT || 3000);
const port = process.env.PORT || 3000
app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/public'));


app.use(pagesMiddleware);
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/index', (req, res) => {
  res.render('index')
})

app.get('/lectures', (req, res) => {
  res.render('lectures')
})

app.get('/marks', (req, res) => {
  res.render('marks')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})


// no other routes match
app.use((req, res) =>
  res.status(404).render('404')
)

// app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}