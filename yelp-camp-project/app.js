var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require('./models/campground')
seedDB = require("./seeds")

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.render("landing");
})

app.get("/campgrounds", function(req,res){
  Campground.find({},function(err,campgrounds){
    if(err)
    {
    } else{
      res.render("campgrounds", {campgrounds: campgrounds});
    }
  });
});

app.get("/campgrounds/new", function(req,res){
  res.render("new");
})

// SHOW
app.get("/campgrounds/:id", function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else{
      res.render("show", {campground: foundCampground});
    }
  });
});

app.post("/campgrounds", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      res.redirect("/campgrounds");
    }
  })

});



app.listen(3000, 'localhost', function(){
  console.log("YelpCamp server has started");
})
