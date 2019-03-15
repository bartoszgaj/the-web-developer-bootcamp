 var moongose = require('mongoose')
 var Campground = require("./models/campground")
 var Comment = require("./models/comment")

var data = [
  {
    name: "Chorzelów",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Śliczny opisik sztos lololo"
  },
  {
    name: "Chorzelów",
    image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Śliczny opisik sztos lololo"
  },
  {
    name: "Chorzelów",
    image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Śliczny opisik sztos lololo"
  }
]

function seedDB(){
   Campground.remove({}, function(err){
     if(err){
       console.log(err);
     } else{
       console.log("removed campgrounds")
      //adding campgrounds
       data.forEach(function(seed){
         Campground.create(seed, function(err, campground){
           if(err){
             console.log(err);
           } else{
             console.log("Added campground");
             Comment.create(
               {
                 text: "This place is great",
                 author: "Homer"
               },function(err,comment){
                 if(err){
                   console.log(err);
                 } else{
                   campground.comments.push(comment);
                   campground.save();
                   console.log("Created new comment")
                 }
               })
           }
         }
       )})


     }
   })


}

module.exports = seedDB;
