var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Genre = require('./models/genre');
Book = require('./models/book');

//connect to mongoose

mongoose.connect('mongodb://localhost/bookstore');

var db = mongoose.connection;
app.use(bodyParser.json());
app.get('/', function(req,res){
    res.send('Please use /api/books or /api/genre');
})

app.get('/api/genres',function(req,res){
    Genre.getGenres(function(err,genres){
        if(err){

        }
        res.json(genres);
    });
});
// add Genre
app.post('/api/genres',function(req,res){
    var genre = req.body;

    Genre.addGenre(genre, function(err,genre){
        if(err){
            res.send(err);
            return;
        }
        res.json(genre);
    });
});

// update genre
app.put('/api/genres/:_id',function(req,res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err,genre){
        if(err){
            res.send(err);
            return;
        }
        res.json(genre);
    });
});

// remove Genre
app.delete('/api/genres/:_id',function(req,res){
    var id = req.params._id;
    Genre.deleteGenreById(id, {}, function(err,book){
        if(err){
            res.send(err);
            return;
        }
        res.json(book);
    });
});

app.get('/api/books/:_id?',function(req,res){
    if(req.params._id){
        var id = req.params._id;
        Book.getBookById(id,function(err,books){
            if(err){
                res.send(err);
            }
            res.json(books);
        });
    }
    else{
        Book.getBooks(function(err,books){
            if(err){
                res.send(err);
            }
            res.json(books);
        })
    }
    
});

app.post('/api/books',function(req,res){
    var book = req.body;

    Book.addBook(book, function(err,book){
        if(err){
            res.send(err);
        }
        res.json(book);
        console.log("Book created with id",book);
    });
});

// update Books
app.put('/api/books/:_id',function(req,res){
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err,book){
        if(err){
            res.send(err);
            return;
        }
        res.json(book);
    });
});


// remove Books
app.delete('/api/books/:_id',function(req,res){
    var id = req.params._id;
    Book.deleteBook(id, {}, function(err,book){
        if(err){
            res.send(err);
            return;
        }
        res.json(book);
    });
});

app.listen(3000);


console.log('Listening to server at port 3000');