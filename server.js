var express = require('express'),
//Using stylus instead of CSS
  stylus = require('stylus'),
  logger = require('morgan'),
  //body-parser is a pieace of middleware from express4 which I need as a prerequisite
  bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
//Compile function for middleware
function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
//Express logging
app.use(logger('dev'));
app.use(bodyParser());
//Configure stylus function with two settings
app.use(stylus.middleware(
{
  src: __dirname + '/public',
  compile: compile
}
));
//Routing for stylus
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
  res.render('index');
})

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');