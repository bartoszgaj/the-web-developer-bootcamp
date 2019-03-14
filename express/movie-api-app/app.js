var express = require('express');
var request = require('request');
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("search")
})


app.get("/results", function(req, res){
  var search = req.query.search;
  request("http://omdbapi.com/?s="+ search + "&apikey=thewdb", function(error, response, body){
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", {data: data});
    }
  })
})


app.listen(3000, 'localhost', function(){
  console.log("App started on port 3000");
})
