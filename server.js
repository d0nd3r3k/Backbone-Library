//Module Dependencies.
var application_root = __dirname,
    express = require("express"),
    mongoose = require("mongoose");
    
//Create Server.
var app = express();

//Connect to Database
mongoose.connect('mongodb://localhost/library_database');

//Schemas
var Book = new mongoose.Schema({
   title:String,
   author:String,
   releaseDate:Date
});

//Models
var BookModel = mongoose.model('Book',Book);

//Configure Server.
app.configure(function(){
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(app.router);
   app.use(express.static(__dirname+'/public'));
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true})); //Show errors in development
});

//Routes

app.get('/api', function(req, res){
   res.send("Library API running") ;
});
app.get('/api/books', function(req,res){
   return BookModel.find(function(err,books){
      if(!err){
          return res.send(books);
      }
      else{
          return console.log(err);
      }
   });
});
app.post('/api/books',function(req,res){
   var book = new BookModel({
       title: req.body.title,
       author: req.body.author,
       releaseDate: req.body.releaseDate
   });
   book.save(function(err){
       if(!err){
           return console.log("created");
       }
       else{
           return console.log(err);
       }
   });
   return res.send(book);
});
//Start Server.
app.listen(8880);