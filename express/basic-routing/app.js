var express = require('express');

var app = express();

app.get("/", function(req,res){
  res.send("Welcome");
})

app.get("/speak/:animal", function(req,res){
  var sounds = {
    pig: "Oink XD",
    cow: "Mooo XD",
    dog: "Woof Wooof"
  }
  var animal = req.params.animal.toLowerCase();
  var sound = sounds[animal];
  res.send(sound);
});

app.get("/repeat/:text/:number", function(req,res){
  var resStr = "";
  for(var i=0; i< Number(req.params.number); i++){
    resStr += req.params.text + " ";
  }

  res.send(resStr);
})

app.get("*", function(req,res){
  res.send("Sorry, page not found...");
})



app.listen(3000, 'localhost', function(){
  console.log("App started on port 3000")
});
