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

//Function to populate initial modules
	  function populateMods(){
		let selectedGroup = 1;
		console.log("POPULATE");
		modsList[0] = document.querySelector("#mods0");
        modsList[1] = document.querySelector("#mods1");
        modsList[2] = document.querySelector("#mods2");
        modsList[3] = document.querySelector("#mods3");
        modsList[4] = document.querySelector("#mods4");
        modsList[5] = document.querySelector("#mods5");
        modsList[6] = document.querySelector("#mods6");
        modsList[7] = document.querySelector("#mods7");
		
		console.dir(modsList);
		
        if (selectedGroup > 0){
		for(let j = 0; j < 8; j++){
          for (let i = 0; i < modules[selectedGroup].length; i++) {
			console.log("SHOWING TEST");
            modsList[j].options[modsList[j].options.length]=new Option(modules[selectedGroup][i].split("|")[0], modules[selectedGroup][i].split("|")[1]);
            modsList[j].selectedIndex = "0";
		  }
		}
      }
	  
	  }
 
      //Function to update currently used modules
      function updateMods(){
	    let selected = new Array();
		
	    selected[0] = document.querySelector("#mods0").selectedIndex;
	    selected[1] = document.querySelector("#mods1").selectedIndex;
		selected[2] = document.querySelector("#mods2").selectedIndex;
	    selected[3] = document.querySelector("#mods3").selectedIndex;
	    selected[4] = document.querySelector("#mods4").selectedIndex;
		selected[5] = document.querySelector("#mods5").selectedIndex;
	    selected[6] = document.querySelector("#mods6").selectedIndex;
		selected[7] = document.querySelector("#mods7").selectedIndex;
		  
		  
		//Setup and update the array of mods
		let selectedGroup = 1;
	    if(selected == 0){
	      selectedGroup = 0;
		}
		for(let x = 0; x < 8; x++){
          modsList[x].options.length = 0;
		}
        if (selectedGroup > 0){
		for(let j = 0; j < 8; j++){
          for (let i = 0; i < modules[selectedGroup].length; i++){
		    modsList[j].options[modsList[j].options.length]=new Option(modules[selectedGroup][i].split("|")[0], modules[selectedGroup][i].split("|")[1]);
		    if((selected[0] != i && selected[1] != i && selected[2] != i && selected[3] != i && selected[4] != i && selected[5] != i && selected[6] != i && selected[7] != i)){
              modsList[j].options[i].disabled = false;
		    } else {
			  modsList[j].options[i].disabled = true;
			}
		  }
		  modsList[j].selectedIndex = selected[j];
		}
        }
      }

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
    if(changeFlow === false && flowTimer < 125){
      flowTimer++;
      flowPosition -= 2;
    } else {
      changeFlow = true;
    }
		
    if(changeFlow === true && flowTimer > 0){
        flowTimer--;
        flowPosition += 2;
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

let modsMain = true;
let statsMain = true;
let scoreState = 0;
	
let canvas = new Array();
let ctx = new Array();

let user = '';
let profilePic = '';
let currentVersion = 1;

let statsScreen = false;

let modules = new Array();
modules[0]="";
modules[1]=["Select|select", "Power Module|Power Module", "Speed Module|Speed Module", "Energy Module|Energy Module", "Defense Module|Defense Module", "Focus Chip|Focus Chip", "Creation Chip|Creation Chip", "Synchronous Chip|Synchronous Chip", "Intensification Chip|Intensification Chip", "Enhance Circuit|Enhance Circuit", "Mind Circuit|Mind Circuit", "Limiter Circuit|Limiter Circuit", "Mastery Circuit|Mastery Circuit", "Data of Piccolo|Data of Piccolo", "Data of Vegeta|Data of Vegeta", "Data of Gohan|Data of Gohan", "Data of Tien|Data of Tien", "Data of Krillin|Data of Krillin"];


//Turn mods into an array
let modsList = new Array();

let openSong = document.getElementById("openSong");