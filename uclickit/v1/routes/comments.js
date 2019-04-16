var express = require("express"),
    router  = express.Router({mergeParams: true});
var Recipe = require("../models/recipes");
var Comment = require("../models/comment");
var middleware = require("../middleware");
    

//===========================
// COMMENTS ROUTES
//===========================


router.get("/new",middleware.isLoggedIn, function(req, res) {
    //find recipe by id
    console.log(req.params.id);
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{recipe: recipe});
        }
    });
    
});

router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup recipe using ID
    Recipe.findById(req.params.id,function(err,recipe){
        if(err){
            console.log(err);
            res.redirect("/recipes");
        }else{
            //create new comment
            //console.log(req.body.comment)
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to recipe
                    recipe.comments.push(comment);
                    recipe.save();
                    //redirect to recipe show page
                    req.flash("success", "Successfully created comment");
                    res.redirect("/recipes/" + Recipe._id);
                }
            });
            
        }
    });
    
});
//comments Edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
       if(err){
           res.redirect("back");
       } else{
           res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
       }
    });
});

// Comments update

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/recipes/" + req.params.id );
        }
    });
});

// COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
   //findByIdAndRemove  
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
        }else {
            req.flash("success", "Successfully Removed Comment");
            res.redirect("/recipes/" + req.params.id);
        }
   });
});




module.exports = router;