"use strict";

// process passwork change input
var handlePassword = function handlePassword(e) {
  e.preventDefault();

  if ($("#oldPass").val() == '' || $("#pass").val() == '' || $("pass2").val() == '') {
    handleError("All fields required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords must match");
    return false;
  }

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};

// display data for password change form
var PasswordWindow = function PasswordWindow(props) {
  return React.createElement(
    "form",
    { id: "passwordForm",
      name: "passwordForm",
      onSubmit: handlePassword,
      action: "/passwordChange",
      method: "POST",
      className: "mainForm"
    },
    React.createElement(
      "label",
      { htmlFor: "oldPass" },
      "Old Pass: "
    ),
    React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "old passwold" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "New Pass: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement(
      "label",
      { htmlFor: "pass2" },
      "New Pass: "
    ),
    React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Submit" })
  );
};

// call for building the password change display
var createPasswordWindow = function createPasswordWindow(csrf) {
  $("#userM").text(user);
  $("#mainMessage").text("Mod Password");
  $("#errorMessage").text("...Awaiting...");

  $("#container").children().hide();

  $("#visuals").children().show();
  $("#visuals2").children().hide();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  ReactDOM.render(React.createElement(PasswordWindow, { csrf: csrf }), document.querySelector("#moreContent"));
};

// call for building the stats display
var createStatsWindow = function createStatsWindow(csrf) {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().show();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  /* ReactDOM.render(
    <StatsForm statss={[]} />, document.querySelector("#statss")
  ); */

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  //document.querySelector("#statsForm").submit();

  loadStatssFromServer();
};

// call for building the high score display
var createScoreWindow = function createScoreWindow(csrf) {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().show();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  loadScoresFromServer();
};

// call for building the game display
var createGameWindow = function createGameWindow(csrf) {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().show();

  $("#makeStats").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().hide();

  ReactDOM.render(React.createElement(StatsForm, { csrf: csrf, statss: [] }), document.querySelector("#makeStats"));

  $("#makeStats").children().hide();

  if (userNew === true) {
    document.querySelector("#statSubmit").click();
    userNew = false;
  }

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));
};

// sends stats to server
var handleStats = function handleStats(e) {
  e.preventDefault();

  sendAjax('POST', $("#statsForm").attr("action"), $("#statsForm").serialize(), function () {
    loadStatssFromServer();
  });

  return false;
};

// creates form to game to input its stats
var StatsForm = function StatsForm(props) {
  return React.createElement(
    "form",
    { id: "statsForm",
      onSubmit: handleStats,
      name: "statsForm",
      action: "/game",
      method: "POST",
      className: "statsForm"
    },
    React.createElement("input", { id: "name", type: "text", name: "name", placeholder: "name" }),
    React.createElement("input", { id: "hsTotal", type: "text", name: "hsTotal", value: app.main.hsTotal }),
    React.createElement("input", { id: "hs18", type: "text", name: "hs18", value: app.main.hs18 }),
    React.createElement("input", { id: "hs17", type: "text", name: "hs17", value: app.main.hs17 }),
    React.createElement("input", { id: "recentVictory", type: "boolean", name: "recentVictory", value: app.main.recentVictory }),
    React.createElement("input", { id: "victories", type: "text", name: "victories", value: app.main.victories }),
    React.createElement("input", { id: "hsVictory", type: "text", name: "hsVictory", value: app.main.hsVictory }),
    React.createElement("input", { id: "kills", type: "text", name: "kills", value: app.main.kills }),
    React.createElement("input", { id: "recentDomination", type: "boolean", name: "recentDomination", value: app.main.recentDomination }),
    React.createElement("input", { id: "dominations", type: "text", name: "dominations", value: app.main.dominations }),
    React.createElement("input", { id: "recentPerfect", type: "boolean", name: "recentPerfect", value: app.main.recentPerfect }),
    React.createElement("input", { id: "perfects", type: "text", name: "perfects", value: app.main.perfects }),
    React.createElement("input", { id: "destroyed", type: "text", name: "destroyed", value: app.main.destroyed }),
    React.createElement("input", { id: "taunts", type: "text", name: "taunts", value: app.main.taunts }),
    React.createElement("input", { id: "teleports", type: "text", name: "teleports", value: app.main.teleports }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", id: "statSubmit", type: "submit", value: "Submit" })
  );
};

// function to compile and stat sheet
var StatsList = function StatsList(props) {

  if (props.statss.length === 0) {
    /* return (
    <div className="statsList">
    <h3 className="emptyStats">No Statistics accumulated</h3>
    </div>
    ); */
    userNew = true;
  }

  var statsNodes = props.statss.map(function (stats) {

    // set user
    user = stats.name;

    //send data to game
    if (app.main.gameState != app.main.GAME_STATE.DEFAULT) {
      app.main.hsTotal = stats.hsTotal;
      app.main.hs18 = stats.hs18;
      app.main.hs17 = stats.hs17;
      app.main.victories = stats.victories;
      app.main.hsVictory = stats.hsVictory;
      app.main.kills = stats.kills;
      app.main.dominations = stats.dominations;
      app.main.perfects = stats.perfects;
      app.main.destroyed = stats.destroyed;
      app.main.taunts = stats.taunts;
      app.main.teleports = stats.teleports;
    }
    if (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory) {
      return React.createElement(
        "div",
        { key: stats._id, className: "stats" },
        React.createElement(
          "h1",
          { className: "labled" },
          "Statistics"
        ),
        React.createElement(
          "h3",
          { className: "name" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Indentity:"
          ),
          " ",
          stats.name,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsTotal" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Total High Score:"
          ),
          " ",
          stats.hsTotal,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hs18" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "High Android 18 Score:"
          ),
          " ",
          stats.hs18,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hs17" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "High Android 17 Score:"
          ),
          " ",
          stats.hs17,
          " "
        ),
        React.createElement(
          "h3",
          { className: "victories" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Victories:"
          ),
          " ",
          stats.victories,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsVictory" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "High Victory Score:"
          ),
          " ",
          stats.hsVictory,
          " "
        ),
        React.createElement(
          "h3",
          { className: "kills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Total Kills:"
          ),
          " ",
          stats.kills,
          " "
        ),
        React.createElement(
          "h3",
          { className: "dominations" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Dominations:"
          ),
          " ",
          stats.dominations,
          " "
        ),
        React.createElement(
          "h3",
          { className: "perfects" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Perfects:"
          ),
          " ",
          stats.perfects,
          " "
        ),
        React.createElement(
          "h3",
          { className: "destroyed" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Destroyed:"
          ),
          " ",
          stats.destroyed,
          " "
        ),
        React.createElement(
          "h1",
          { className: "labled" },
          " Extra Stats "
        ),
        React.createElement(
          "h3",
          { className: "taunts" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Taunts:"
          ),
          " ",
          stats.taunts,
          " "
        ),
        React.createElement(
          "h3",
          { className: "teleports" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Super Speeds:"
          ),
          " ",
          stats.teleports,
          " "
        )
      );
    } else {
      return React.createElement("div", null);
    }
  });

  return React.createElement(
    "div",
    { className: "statsList" },
    statsNodes
  );
};

// get scores and build a high score list
var ScoreList = function ScoreList(props) {
  if (props.scores.length === 0) {
    return React.createElement(
      "div",
      { className: "statsList" },
      React.createElement(
        "h3",
        { className: "emptyStats" },
        "No Scores accumulated"
      )
    );
  }

  var hScores = props.scores;

  if (props.scores.length > 1) {

    // sort the all current scores
    var compare = function compare(a, b) {
      if (a.hsTotal > b.hsTotal) return -1;
      if (a.hsTotal < b.hsTotal) return 1;
      return 0;
    };

    hScores.sort(compare);
  }

  hScores.splice(5, 1000000000000); //Remove all extra scores

  var number = 0;

  var scoreNodes = hScores.map(function (score) {
    number++;

    return React.createElement(
      "div",
      { className: "score" },
      React.createElement("img", { src: "/assets/images/RedRibbon.png", alt: "stats face", className: "statsFace" }),
      React.createElement(
        "h3",
        { className: "scores" },
        " ",
        React.createElement(
          "span",
          { className: "labled3" },
          number
        ),
        " "
      ),
      React.createElement(
        "h3",
        { className: "scores" },
        " ",
        React.createElement(
          "span",
          { className: "labled2" },
          "Identity:"
        ),
        " ",
        score.name,
        " "
      ),
      React.createElement(
        "h3",
        { className: "scores" },
        " ",
        React.createElement(
          "span",
          { className: "labled2" },
          "Score:"
        ),
        " ",
        score.hsTotal,
        " "
      )
    );
  });

  return React.createElement(
    "div",
    { className: "scoreList" },
    scoreNodes
  );
};

// get request and react render for stats
var loadStatssFromServer = function loadStatssFromServer() {
  sendAjax('GET', '/getStatss', null, function (data) {
    ReactDOM.render(React.createElement(StatsList, { statss: data.statss }), document.querySelector("#statss"));
  });
};

// get request and react render for scores
var loadScoresFromServer = function loadScoresFromServer() {
  sendAjax('GET', '/getScores', null, function (data) {
    ReactDOM.render(React.createElement(ScoreList, { scores: data.scores }), document.querySelector("#scores"));
  });
};

var setup = function setup(csrf) {

  // prepare canvas
  canvas[0] = document.querySelector('#canvasBack');
  ctx[0] = canvas[0].getContext('2d');

  // actions for the password page button
  passwordButton.addEventListener("click", function (e) {
    e.preventDefault();
    app.main.pausedGame();
    createPasswordWindow(csrf);
    app.main.onScreen = false;
    paused = true;
    return false;
  });

  // actions for the game page button
  gameButton.addEventListener("click", function (e) {
    e.preventDefault();
    createGameWindow(csrf);
    //app.main.pausedGame();
    app.main.onScreen = true;
    app.main.sound.playEffect(66);
    if (app.main.gameState != app.main.GAME_STATE.DEFAULT && app.main.gameState != app.main.GAME_STATE.TUTORIAL || app.main.introState == true || app.main.endingState == true || app.main.specialScene == true) {
      app.main.resumeGame();
    }
    return false;
  });

  // actions for the stats page button
  statsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createStatsWindow(csrf);
    app.main.pausedGame();
    app.main.onScreen = false;
    paused = true;
    return false;
  });

  // actions for the score page button
  scoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    createScoreWindow(csrf);
    app.main.pausedGame();
    app.main.onScreen = false;
    paused = true;
    return false;
  });

  // to prepare stats
  ReactDOM.render(React.createElement(StatsForm, { csrf: csrf, statss: [] }), document.querySelector("#makeStats"));

  // prevent changing pages until game loads
  passwordButton.className = "disabledLink";
  statsButton.className = "disabledLink";
  scoreButton.className = "disabledLink";
  gameButton.focus();

  //Begin update loop
  requestAnimationFrame(update);

  paused = false;

  /* if(userNew === true){
  document.querySelector("#statSubmit").click();
  userNew = false;
  } */

  createGameWindow(csrf); //default view
};

// get csrf token
var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

// setup buttons
var passwordButton = document.querySelector("#passwordButton");
var statsButton = document.querySelector("#stat");
var scoreButton = document.querySelector("#scoreButton");
var gameButton = document.querySelector("#gameButton");

// for new user data
var userNew = false;
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
