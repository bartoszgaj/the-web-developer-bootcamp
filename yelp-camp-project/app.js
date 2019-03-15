var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Chorzelów",
//     image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104490f2c478a1e5b6bd_340.jpg",
//     description: "Ulala ale tam jest ładnie Ło jezu śliczny opis"
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     } else{
//       console.log(campground);
//     }
//   }
// )
// var campgrounds = [
//   {name: "Chorzelów", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104490f2c478a1e5b6bd_340.jpg"},
//   {name: "Mielec", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//   {name: "Malinie", image: "https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"},
//   {name: "Krakow", image: "https://farm2.staticflickr.com/1266/973330600_c1360f7cd3.jpg"}
// ]

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


app.get("/campgrounds/:id", function(req,res){
  var id = req.params.id;
  console.log("DEBUGUG" + id)
  Campground.findById(id, function(err, foundCampground){
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
