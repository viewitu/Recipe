var mongoose = require("mongoose"),
    $ = require("jQery");
var passportLocalMongoose = require("passport-local-mongoose");

var TodoSchema = new mongoose.Schema({
    
    password: String,
    avatar: String, 
    firstName: String,
    lastName: String,
    about: String,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
});
TodoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Todo", TodoSchema);//check off specific to do's by clicking
$("ul").on("click", "li",function(){
    $(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(1000,function(){
        	$(this).remove();
    });
    event.stopPropagation();
});
//new todos
$('input[type="text"]').keypress(function(event){
    if(event.which === 13){
        var itemadd = $(this).val();
        $(this).val("");
    //add content of textbox to the ul
    $("ul").append("<li><span> <i class='fa fa-eraser'></i> </span> " + itemadd + "</li>")
}
});

$(".fa-plus").click(function(){
    $('input[type="text"]').fadeToggle(1000)
});
