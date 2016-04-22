//Dependencies
/*********************************************/

'use strict';

var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    dateFormat = require('dateformat'),
    Handlebars = require('handlebars'),
    HandlebarsIntl = require('handlebars-intl'),
    methodOverride = require('method-override'),
    exphbs = require('express-handlebars');

/*********************************************/


//Handlebars settings
/*********************************************/

//body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

//method Override
app.use(methodOverride('_method'));

//view engine init
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));


app.set('view engine', 'handlebars');
HandlebarsIntl.registerWith(Handlebars);

//Serve static assets
app.use(express.static('public/'));
app.use(express.static('views/layouts/'));
app.use(express.static('public/img/**.*'));

/*********************************************/


//Mongoose/ Model Config
/*********************************************/

mongoose.connect('mongodb://localhost/reposte_app');
var blogSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    placeholderName: String, //UserName
    body: String,
    created: {
        type: Date,
        default: Date.now
    }

}, {
  timestamps: true
});



//Default Blog Model
var Blog = mongoose.model('Blog', blogSchema);

//Name Placeholder
var placeholderName = 'Patrick';


/*********************************************/
var Blog = mongoose.model('Blog', blogSchema);
//End



//Misc
/*********************************************/
//listening port
var port = Number(process.env.PORT || 3000);

//pages paths
var paths = {
    index: 'partials/index',
    new: 'partials/newblog',
    show: 'partials/show',
    edit: 'partials/edit'
};

/*********************************************/


//Routes
/*********************************************/

//Main index
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

//Index show all blogs
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {

      blogs.sort(function(a, b) { //sort algorithm based on post dates
        return (a.created > b.created) ? -1 : ((a.created < b.created) ? 1 : 0);
      });

        if (err) {
            console.log(err);
        } else {
            res.render(paths.index, {
                name: placeholderName,
                blogs: blogs
            });
        }
    });
});

//New Route
app.get('/blogs/new', function(req, res) {
    res.render(paths.new, {
        name: placeholderName
    });
});

//Create Route
//POST
app.post('/blogs', function(req, res) {

    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render(paths.new);
        } else {
            res.redirect('/blogs');
        }
    });
});

// Show specific Blog route
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            console.log(err);
            res.redirect('/blogs');
        } else {
            res.render(paths.show, {
                blog: foundBlog
            });
        }
    });

});


//Edit Route
app.get('/blogs/:id/edit', function(req,res){
  Blog.findById(req.params.id, function(err,foundBlog){
    if(err){
      console.log(err);
      res.redirect('/blogs');
    } else {
      res.render(paths.edit, {blog:foundBlog});

    }
  });
});

//Update Route
app.put('/blogs/:id', function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err) {
      console.log(err);
    } else {
      res.redirect('/blogs');
    }
  });
});

//Delete Route
app.delete('/blogs/:id', function(req,res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

//listening port
app.listen(port, function() {
    console.log('Server Started');
});
/*********************************************/
