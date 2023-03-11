const mongoose = require("mongoose")
const  {Schema} = mongoose;


const DirectorSchema = new Schema({
    name:String,
    age: Number,
},{
    timestamps: true
})

const UserModelDirector = mongoose.model("diretors", DirectorSchema)

exports.modules = UserModelDirector