var express = require('express');

var app = express();

app.get("/", function(req,res){
  res.send("Welcome");
})

app.get("/speak/pig", function(req,res){
  res.send("Oink XD");
})

app.get("/speak/cow", function(req,res){
  res.send("Mooo XD");
})

app.get("/speak/dog", function(req,res){
  res.send("Woof Woof!");
})

app.get("/repeat/:text/:number", function(req,res){
  var resStr = "";
  for(var i=0; i< req.params.number; i++){
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
