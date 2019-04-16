var mongoose = require("mongoose"),
    $        = require("jQery");
//Schema Setup

var recipeSchema = new mongoose.Schema({
    name: {type:String, required: true, unique: true},
    preptime: Number,
    cooktime: Number,
    cookmethod: String,
    ingredients: [{
        amount:{type: Number, required:true, default: 1},
        measure:{type: String, lowercase: true, trim:true},
        ingredient:{type: String, required: true}
    }],
    image: String,
    
    description: String,
    source:{type:String},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ]
        
});


module.exports = mongoose.model("Recipe", recipeSchema);