var     express     =   require("express"),
        app         =   express(),
        bodyParser  =   require("body-parser"),
        mongoose    =   require("mongoose"),
        passport    =   require("passport"),
        localStrategy=   require("passport-local"),
        methodOverride = require("method-override"),
        User        =   require("./models/user"),
        Recipe      =   require("./models/recipes"),
        Comment     =   require("./models/comment"),
        flash       =   require("connect-flash"),
        commentRoutes   =   require("./routes/comments"),
        recipeRoutes=   require("./routes/recipes"),
        authRoutes      =   require("./routes/index");
   mongoose.connect("mongodb://localhost/recipe_Data");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();
//Passport Configuration
app.use(require("express-session")({
    secret: "Zach is F'in awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error      = req.flash("error");
    res.locals.success    = req.flash("success");
    next();
});

app.use("/", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Recipes Server has Started!!!");
}) 

