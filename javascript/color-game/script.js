
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var buttons = document.querySelectorAll(".modeBtn");

colorDisplay.textContent = pickedColor;

init();

function init(){
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
      buttons[0].classList.remove("selected");
      buttons[1].classList.remove("selected");
      this.classList.add("selected")
      if(this.textContent == "Easy"){
        numSquares = 3;
      }
      else{
        numSquares = 6;
      }
      reset();
    })
  }

  for(var i = 0; i< squares.length; i++){
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function(){
      var clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!"
        h1.style.backgroundColor = clickedColor;
        changeColors(clickedColor);
        resetButton.textContent = "Play again?";
      }
      else{
        this.style.backgroundColor = "#232323"
        messageDisplay.textContent = "Try again"
      }
    })
  }
  reset();

}

resetButton.addEventListener("click", function(){
  reset();
})



function reset(){
  resetButton.textContent = "New Colors?"
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for(var i = 0; i< squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    else{
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
}


function changeColors(color){
  for(var i = 0; i< squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  var arr = [];
  for(var i = 0; i< num; i++){
    arr[i] = randomColor();
  }

  return arr;
}

function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
