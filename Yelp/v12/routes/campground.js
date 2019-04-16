var express = require("express"),
    router  = express.Router({mergeParams: true});
    var Campground = require("../models/campground");
    var middleware = require("../middleware");

//=================================================================
//Campground ROUTES
//=================================================================
router.get("/", function(req,res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgroundsDB){
        if (err){
            console.log("Something went wrong" + err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgroundsDB, currentUser: req.user});
            
        }
    });
   // res.render("campgrounds",{campgrounds: campgrounds});
    
});

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req,res){ //same URL just on a post instead of a get
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Create a campground and save it to the DB was campgrounds.push(newCampground); with array
    Campground.create(newCampground, function(err, createCampgroundDB){
        if(err){
            console.log(err);
        }else{
             // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});
router.get("/new", middleware.isLoggedIn, function(req,res){
    
    //get data from form and add to campgrounds array
    res.render("campgrounds/new");
    // redirect back to campgrounds page
    
    
});


//SHOW - Show info about one item in the database
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
//render that campground
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    //is user logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
        
    
});

});
// Update Campgroud Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
           }else{
               res.redirect("/campgrounds");
           }
   });
});





    
module.exports = router;
