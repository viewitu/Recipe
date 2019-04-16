var middlewareObj = {};
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");



middlewareObj.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
           Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found")
                    res.redirect("back");
                }else{
                    // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                    if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
                     // does user own the campground
                     if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                     }else{
                        req.flash("error", "You Don't have the permissions for that")
                        res.redirect("back") ;
                     }
                }
            });
        }else{
            res.redirect("back");
            }
    };
    


middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Comment not Found");
                    res.redirect("back");
                }else{
                    // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                    if (!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                     }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
                     // does user own the comment
                     if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                     }else{
                         req.flash("error", "You Don't have the permissions for that");
                        res.redirect("back") ;
                     }
                }
            });
        }else{
            req.flash("error", " You need to be logged in to do that!")
            res.redirect("back");
            }
    };
    
    


middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need to be Logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;