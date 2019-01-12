var mongoose = require('mongoose');


//Genre Schemas

var bookSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    genre:{
        type:String,
        required: true
    },
    publsiher:{
        type:String,
        required: true
    },
    Pages:{
        type:Number,
        required: true
    },
    Price:{
        type:Number,
        required: true
    },
    create_date:{
        type:Date,
        default: Date.now
    }
})

var Book = module.exports = mongoose.model('Books',bookSchema);


//Get Books

module.exports.getBooks = function(callback,limit){
    Book.find(callback).limit(limit);
}

module.exports.getBookById = function(book,callback){
    Book.findById(book, callback);
}
//Create Book
module.exports.addBook = function(book, callback){
    Book.create(book, callback);
}

// update Book
module.exports.updateBook = function(id, book, options, callback){
    var query = {_id: id};
    var update = {}
    if(book.name){
        update.name = book.name;
    }

    if(book.genre){
        update.genre = book.genre;
    }
    if(book.publsiher){
        update.publsiher = book.publsiher;
    }
    if(book.Pages || book.pages){
        update.Pages = book.pages? book.pages : book.Pages;
    }
    if(book.price || book.Price){
        update.Price = book.price? book.price:book.Price;
    }
    
    Book.findOneAndUpdate(query, update, options, callback);
}

// delete Book
module.exports.deleteBook = function(id, options, callback){
    Book.findByIdAndDelete(id, options, callback);
}