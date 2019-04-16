var express = require("express"),
    router  = express.Router({mergeParams: true});
    var recipe = require("../models/recipes");
    var middleware = require("../middleware");

//=================================================================
//recipe ROUTES
//=================================================================
router.get("/", function(req,res){
    //get all recipes from db
    recipe.find({},function(err, allrecipesDB){
        if (err){
            console.log("Something went wrong" + err);
        }else{
            res.render("recipes/index",{recipes: allrecipesDB, currentUser: req.user});
            
        }
    });
   // res.render("recipes",{recipes: recipes});
    
});

//Create - add new recipe to DB
router.post("/", middleware.isLoggedIn, function(req,res){ //same URL just on a post instead of a get
    //get data from form and add to recipes array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newrecipe = {name: name, price: price, image: image, description: desc, author: author};
    // Create a recipe and save it to the DB was recipes.push(newrecipe); with array
    recipe.create(newrecipe, function(err, createrecipeDB){
        if(err){
            console.log(err);
        }else{
             // redirect back to recipes page
            res.redirect("/recipes");
        }
    });
});
router.get("/new", middleware.isLoggedIn, function(req,res){
    
    //get data from form and add to recipes array
    res.render("recipes/new");
    // redirect back to recipes page
    
    
});


// //SHOW - Show info about one item in the database
// router.get("/:id", function(req, res){
//     //find the recipe with provided ID
//     recipe.findById(req.params.id).populate("comments").exec(function(err, foundrecipe){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(foundrecipe);
//             res.render("recipes/show", {recipe: foundrecipe});
//         }
//     });
// //render that recipe
// });

// // Edit recipe Route
// router.get("/:id/edit", middleware.checkrecipeOwnership, function(req,res){
//     //is user logged in
//     recipe.findById(req.params.id, function(err, foundrecipe){
//         res.render("recipes/edit", {recipe: foundrecipe});
        
    
// });

// });
// // Update Campgroud Route
// router.put("/:id", middleware.checkrecipeOwnership,function(req,res){
//     //find and update the correct recipe
//     recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedrecipe){
//         if(err){
//             res.redirect("/recipes");
//         }else{
//             //redirect to show page
//             res.redirect("/recipes/" + req.params.id);
//         }
//     });
// });

// // DESTROY recipe ROUTE
// router.delete("/:id", middleware.checkrecipeOwnership, function(req,res){
//   recipe.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/recipes");
//           }else{
//               res.redirect("/recipes");
//           }
//   });
// });





    
module.exports = router;
