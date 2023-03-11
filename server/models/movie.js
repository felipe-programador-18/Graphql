const mongoose = require("mongoose")
const {Schema} = mongoose;


const MoviesSchema = new Schema({
   name:String,
   genre:String,
   directorId: String
},
{
    timestamps:true
})

const ModelMovies = mongoose.model("movies",MoviesSchema)
exports.module = ModelMovies;