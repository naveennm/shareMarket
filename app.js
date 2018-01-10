var express  = require('express');
var app      = express();         
var cookieParser = require('cookie-parser');                      // create our app w/ express
var mongoose = require('mongoose'); 
var passport = require('passport');  
var session = require('express-session');
var LocalStrategy    = require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;;            // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var loginController = require('./controllers/loginController.js');
var passportTwitter = require('./config/twitter.js');
// configuration =================

     // connect to mongoDB database on modulus.io
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));   
app.use(express.static(__dirname + '/views'));              // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

mongoose.connect('mongodb://localhost:41658/test1234');
var Todo = mongoose.model('stockdb', {
    stripcode: Number,
    stripname: String,
    currentrate: Number,
    stockloss: Number,
    target: Number
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

app.use(bodyParser.urlencoded({
extended: false
}))
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));
// app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/views/index.html');
// })

app.get('/', function(req, res) {
    res.sendfile('main.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        console.log(todos);
        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
// app.post('/api/todos', function(req, res) {
//     console.log(req.body.text);
//     // create a todo, information comes from AJAX request from Angular
//     Todo.create({
//         text : req.body.text
//     }, function(err, todo) {
//         if (err)
//             res.send(err);

//         // get and return all the todos after you create another
//         return res.json('No data found');
//     });

// });
  app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            stripcode : req.body.test,
            stripname: req.body.stripname,
            currentrate: req.body.currentrate,
            stockloss: req.body.stockloss,
            target: req.body.target
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});



app.put('/api/todos/:id', function(req, res) {
    console.log("put12",req.params.id); 
  

    // create a todo, information comes from AJAX request from Angular
//   /Todo.updateById(req.body.id, req.body.test, function(err, result) {
  Todo.findById(req.params.id, function (err, result){
    if (err) {
        return res.json('No data found');
    } 

var newvalues = 
{ 
    stripcode : req.body.test,
    stripname : req.body.stripname,
    currentrate : req.body.currentrate,
    stockloss : req.body.stockloss,
    target : req.body.target
};
console.log( req.body.stripname);
console.log(req.body.test);
Todo.updateOne({_id:req.params.id}, {$set : newvalues}, function(err, result) {


  //  Todo.updateById(req.params.todo_id, { text: req.body.text }, function(err, updatedTodo) {
      if (err) {
        return res.json(err);
      } 
      Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
  });
});


app.post('/api/login', function (req, res) {
    loginController.create(req, res);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.sendfile('main.html');
  });

app.listen(80);