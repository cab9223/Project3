// helper function to display error messages
const handleError = (message) => {
  $("#errorMessage").text(message);
};

// redirection helper function
const redirect = (response) => {
  window.location = response.redirect;
};

// function for all Ajax requests
const sendAjax = (type, action, data, success) => {
  $.ajax({
	cashe: false,
	type: type,
	url: action,
	data: data,
	dataType: "json",
	success: success,
	error: function(xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
	  handleError(messageObj.error);
	}
  });
};

// main site update loop
const update = () => {
	
  //Maintain update loop
  requestAnimationFrame(update);
	 	
  //Set current time
  let now = new Date().getTime();

  //Update runs here
  if ((now - lastExecution) > (1000 / fps)){
  
		
    //Fade effect for inner layer
    if(innerAlpha > .35 && innerIncreasing === true){
      innerIncreasing = false;
    } else if(innerAlpha < .15 && innerIncreasing === false){
      innerIncreasing = true;
    }
		
    //Fade effect for inner layer
    if(innerIncreasing === true){
      innerAlpha += .01;
    } else if(innerIncreasing === false){
      innerAlpha -= .01;
    }
		
	// change effect for paused
	if(paused === true){
    if(changeFlow === false && flowTimer < 250){
      flowTimer++;
      flowPosition -= 1;
    } else {
      changeFlow = true;
    }
		
    if(changeFlow === true && flowTimer > 0){
        flowTimer--;
        flowPosition += 1;
      } else {
        changeFlow = false;
      }
    }
		
	// clear all images
    for(let i = 0; i < 1; i++){
      ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
    }
		
		
    //Background draws
    ctx[0].fillStyle = "black";
    ctx[0].fillRect(0,0,canvas[0].width,canvas[0].height);
    ctx[0].save();
    if(paused === true){
      ctx[0].globalAlpha = (.1 - innerAlpha + outerAlpha);
    } else {
      ctx[0].globalAlpha = (.25 - innerAlpha + outerAlpha);
    }
    ctx[0].translate(0,flowPosition);
    ctx[0].drawImage(circuitry,0,0);
    ctx[0].restore();
		
    lastExecution = new Date().getTime();
  }
};

//Globals
let image = new Image();
image.src =  "images/circuitry.png";
let circuitry = image;
	
const fps = 20;
let lastExecution = new Date().getTime();

//Animation variables
let outerAlpha = .3;
let innerAlpha = .3;
let outerIncreasing = true;
let innerIncreasing = true;
let flowTimer = 0;
let flowPosition = 0;
let changeFlow = false;

let paused = true;
	
let canvas = new Array();
let ctx = new Array();

let user = '';

let openSong = document.getElementById("openSong");