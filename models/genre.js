var mongoose = require('mongoose');


//Genre Schemas

var genreSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    create_date:{
        type:Date,
        default: Date.now
    }
})

var Genre = module.exports = mongoose.model('Genre',genreSchema);


//Get Genres

module.exports.getGenres = function(callback,limit){
    Genre.find(callback).limit(limit);
}
// add Genre
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}
// update Genre
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteGenreById = function(id, options, callback){
    Genre.findByIdAndDelete(id, options, callback);
}