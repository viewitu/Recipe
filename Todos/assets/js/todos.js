var $ = require("jQery"); 
//check off specific to do's by clicking
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
