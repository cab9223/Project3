"use strict";

// checks and posts login data to server
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

// checks and posts signup data to server
var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR: Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

// builds the login form
var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    "form",
    { id: "loginForm", name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    },
    React.createElement(
      "label",
      { htmlFor: "username" },
      "Username: "
    ),
    React.createElement("input", { id: "user", type: "text", name: "username", maxLength: "15", placeholder: "username" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "Password: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Access" })
  );
};

// builds the signup form
var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    "form",
    { id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    },
    React.createElement(
      "label",
      { htmlFor: "username" },
      "Username: "
    ),
    React.createElement("input", { id: "user", type: "text", name: "username", maxLength: "15", placeholder: "username" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "Password: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement(
      "label",
      { htmlFor: "pass2" },
      "Password: "
    ),
    React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Create" })
  );
};

// react call to display login form
var createLoginWindow = function createLoginWindow(csrf) {
  $("#mainMessage").text("Log in");
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

// react call to display signup form
var createSignupWindow = function createSignupWindow(csrf) {
  $("#mainMessage").text("Regester");
  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

// initialize setup data
var setup = function setup(csrf) {
  // setup canvas
  canvas[0] = document.querySelector('#canvasBack');
  ctx[0] = canvas[0].getContext('2d');

  // reduce music volume
  openSong.volume = 0.2;

  // setup buttons
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");

  // actions for the signup button
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  // actions for the login button
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  loginButton.focus();

  //Begin update loop
  requestAnimationFrame(update);

  createLoginWindow(csrf); //default view
};

// get a csrf token
var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

// auto pause song
window.onblur = function () {
  openSong.pause();
};

// auto resume song
window.onfocus = function () {
  openSong.play();
};
"use strict";

// helper function to display error messages
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

// redirection helper function
var redirect = function redirect(response) {
  window.location = response.redirect;
};

// function for all Ajax requests
var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cashe: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

// main site update loop
var update = function update() {

  //Maintain update loop
  requestAnimationFrame(update);

  //Set current time
  var now = new Date().getTime();

  //Update runs here
  if (now - lastExecution > 1000 / fps) {

    //Fade effect for inner layer
    if (innerAlpha > .35 && innerIncreasing === true) {
      innerIncreasing = false;
    } else if (innerAlpha < .15 && innerIncreasing === false) {
      innerIncreasing = true;
    }

    //Fade effect for inner layer
    if (innerIncreasing === true) {
      innerAlpha += .01;
    } else if (innerIncreasing === false) {
      innerAlpha -= .01;
    }

    // change effect for paused
    if (paused === true) {
      if (changeFlow === false && flowTimer < 250) {
        flowTimer++;
        flowPosition -= 1;
      } else {
        changeFlow = true;
      }

      if (changeFlow === true && flowTimer > 0) {
        flowTimer--;
        flowPosition += 1;
      } else {
        changeFlow = false;
      }
    }

    // clear all images
    for (var i = 0; i < 1; i++) {
      ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
    }

    //Background draws
    ctx[0].fillStyle = "black";
    ctx[0].fillRect(0, 0, canvas[0].width, canvas[0].height);
    ctx[0].save();
    if (paused === true) {
      ctx[0].globalAlpha = .1 - innerAlpha + outerAlpha;
    } else {
      ctx[0].globalAlpha = .25 - innerAlpha + outerAlpha;
    }
    ctx[0].translate(0, flowPosition);
    ctx[0].drawImage(circuitry, 0, 0);
    ctx[0].restore();

    lastExecution = new Date().getTime();
  }
};

//Globals
var image = new Image();
image.src = "images/circuitry.png";
var circuitry = image;

var fps = 20;
var lastExecution = new Date().getTime();

//Animation variables
var outerAlpha = .3;
var innerAlpha = .3;
var outerIncreasing = true;
var innerIncreasing = true;
var flowTimer = 0;
var flowPosition = 0;
var changeFlow = false;

var paused = true;

var canvas = new Array();
var ctx = new Array();

var user = '';

var openSong = document.getElementById("openSong");
