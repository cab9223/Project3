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
    React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "old password" }),
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
  $("#visuals3").children().hide();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  $("#makeStats").children().hide();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#modsDivv"));

  ReactDOM.render(React.createElement(PasswordWindow, { csrf: csrf }), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement(
    "div",
    null,
    " ",
    React.createElement("img", { src: profilePic, alt: "Profile Not Available", className: "profilePic" }),
    " "
  ), document.querySelector("#profile"));

  /* ReactDOM.render(
    <profileChange />,
  document.querySelector("#borderSideBack")
  ); */

  //profilePull();
};

// call for building the stats display
var createStatsWindow = function createStatsWindow(csrf) {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().show();
  $("#visuals3").children().hide();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#profile"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#modsDivv"));

  /* ReactDOM.render(
    <StatsForm statss={[]} />, document.querySelector("#statss")
  ); */

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  //document.querySelector("#statsForm").submit();

  loadStatssFromServer();
};

// call for building the stats display
var createModsWindow = function createModsWindow(csrf) {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().hide();
  $("#visuals3").children().show();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#profile"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  //document.querySelector("#statsForm").submit();

  //loadModsFromServer();

  //populateMods();
};

// call for building the high score display
var createScoreWindow = function createScoreWindow(csrf) {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().show();
  $("#visuals3").children().hide();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#profile"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#modsDivv"));

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
  $("#visuals3").children().hide();

  ReactDOM.render(React.createElement(StatsForm, { csrf: csrf, statss: [] }), document.querySelector("#makeStats"));

  $("#makeStats").children().hide();

  if (userNew === true) {
    document.querySelector("#statSubmit").click();
    userNew = false;
  }

  ReactDOM.render(React.createElement("div", null), document.querySelector("#profile"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#modsDivv"));
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
  console.log("statsForm@@@@@@@@@@@@@");
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
    React.createElement("input", { id: "version", type: "text", name: "version", value: app.main.version }),
    React.createElement("input", { id: "exp", type: "text", name: "exp", value: app.main.exp }),
    React.createElement("input", { id: "profile", type: "text", name: "profile", value: profilePic }),
    React.createElement("input", { id: "hsTotal", type: "text", name: "hsTotal", value: app.main.hsTotal }),
    React.createElement("input", { id: "hsTotalT1", type: "text", name: "hsTotalT1", value: app.main.hsTotalT1 }),
    React.createElement("input", { id: "hsTotalT2", type: "text", name: "hsTotalT2", value: app.main.hsTotalT2 }),
    React.createElement("input", { id: "hsTotalT3", type: "text", name: "hsTotalT3", value: app.main.hsTotalT3 }),
    React.createElement("input", { id: "hs18", type: "text", name: "hs18", value: app.main.hs18 }),
    React.createElement("input", { id: "hs17", type: "text", name: "hs17", value: app.main.hs17 }),
    React.createElement("input", { id: "recentVictory", type: "boolean", name: "recentVictory", value: app.main.recentVictory }),
    React.createElement("input", { id: "victories", type: "text", name: "victories", value: app.main.victories }),
    React.createElement("input", { id: "hsVictory", type: "text", name: "hsVictory", value: app.main.hsVictory }),
    React.createElement("input", { id: "kills", type: "text", name: "kills", value: app.main.kills }),
    React.createElement("input", { id: "recentDomination", type: "boolean", name: "recentDomination", value: app.main.recentDomination }),
    React.createElement("input", { id: "dominations", type: "text", name: "dominations", value: app.main.dominations }),
    React.createElement("input", { id: "dominationsRR", type: "text", name: "dominationsRR", value: app.main.dominationsRR }),
    React.createElement("input", { id: "recentPerfect", type: "boolean", name: "recentPerfect", value: app.main.recentPerfect }),
    React.createElement("input", { id: "perfects", type: "text", name: "perfects", value: app.main.perfects }),
    React.createElement("input", { id: "destroyed", type: "text", name: "destroyed", value: app.main.destroyed }),
    React.createElement("input", { id: "taunts", type: "text", name: "taunts", value: app.main.taunts }),
    React.createElement("input", { id: "teleports", type: "text", name: "teleports", value: app.main.teleports }),
    React.createElement("input", { id: "melee", type: "text", name: "melee", value: app.main.meleeStat }),
    React.createElement("input", { id: "blasts", type: "text", name: "blasts", value: app.main.blastsStat }),
    React.createElement("input", { id: "powerBlasts", type: "text", name: "powerBlasts", value: app.main.powerBlasts }),
    React.createElement("input", { id: "blocking", type: "text", name: "blocking", value: app.main.blockingCount }),
    React.createElement("input", { id: "shielding", type: "text", name: "shielding", value: app.main.shieldingCount }),
    React.createElement("input", { id: "piccoloKill", type: "text", name: "piccoloKill", value: app.main.piccoloKill }),
    React.createElement("input", { id: "vegetaKill", type: "text", name: "vegetaKill", value: app.main.vegetaKill }),
    React.createElement("input", { id: "gohanKill", type: "text", name: "gohanKill", value: app.main.gohanKill }),
    React.createElement("input", { id: "tienKill", type: "text", name: "tienKill", value: app.main.tienKill }),
    React.createElement("input", { id: "krillinKill", type: "text", name: "krillinKill", value: app.main.krillinKill }),
    React.createElement("input", { id: "lootT1", type: "text", name: "lootT1", value: app.main.lootT1 }),
    React.createElement("input", { id: "lootT2", type: "text", name: "lootT2", value: app.main.lootT2 }),
    React.createElement("input", { id: "lootT3", type: "text", name: "lootT3", value: app.main.lootT3 }),
    React.createElement("input", { id: "lootT4", type: "text", name: "lootT4", value: app.main.lootT4 }),
    React.createElement("input", { id: "modsT1", type: "text", name: "modsT1", value: app.main.modsT1 }),
    React.createElement("input", { id: "modsT2", type: "text", name: "modsT2", value: app.main.modsT2 }),
    React.createElement("input", { id: "modsT3", type: "text", name: "modsT3", value: app.main.modsT3 }),
    React.createElement("input", { id: "modsT4", type: "text", name: "modsT4", value: app.main.modsT4 }),
    React.createElement("input", { id: "modsT5", type: "text", name: "modsT5", value: app.main.modsT5 }),
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

    // set profile
    profilePic = stats.profile;

    // set version
    currentVersion = stats.version;

    //send data to game
    if (app.main.gameState != app.main.GAME_STATE.DEFAULT) {
      app.main.version = stats.version;
      app.main.exp = stats.exp;
      app.main.hsTotal = stats.hsTotal;
      app.main.hsTotalT1 = stats.hsTotalT1;
      app.main.hsTotalT2 = stats.hsTotalT2;
      app.main.hsTotalT3 = stats.hsTotalT3;
      app.main.hs18 = stats.hs18;
      app.main.hs17 = stats.hs17;
      app.main.victories = stats.victories;
      app.main.hsVictory = stats.hsVictory;
      app.main.kills = stats.kills;
      app.main.dominations = stats.dominations;
      app.main.dominationsRR = stats.dominationsRR;
      app.main.perfects = stats.perfects;
      app.main.destroyed = stats.destroyed;
      app.main.taunts = stats.taunts;
      app.main.teleports = stats.teleports;
      app.main.meleeStat = stats.melee;
      app.main.blastsStat = stats.blasts;
      app.main.powerBlasts = stats.powerBlasts;
      app.main.blockingCount = stats.blocking;
      app.main.shieldingCount = stats.shielding;
      app.main.piccoloKill = stats.piccoloKill;
      app.main.vegetaKill = stats.vegetaKill;
      app.main.gohanKill = stats.gohanKill;
      app.main.tienKill = stats.tienKill;
      app.main.krillinKill = stats.krillinKill;
      app.main.lootT1 = stats.lootT1;
      app.main.lootT2 = stats.lootT2;
      app.main.lootT3 = stats.lootT3;
      app.main.lootT4 = stats.lootT4;
      app.main.modsT1 = stats.modsT1;
      app.main.modsT2 = stats.modsT2;
      app.main.modsT3 = stats.modsT3;
      app.main.modsT4 = stats.modsT4;
      app.main.modsT5 = stats.modsT5;
    }
    if (statsMain === true && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)) {
      return React.createElement(
        "div",
        { key: stats._id, className: "stats" },
        React.createElement(
          "h1",
          { className: "labled" },
          "Main Statistics"
        ),
        React.createElement(
          "button",
          { className: "formSubmit2", onClick: function onClick() {
              changeStats();
            } },
          "Extra Stats"
        ),
        React.createElement(
          "h3",
          { className: "version" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "System Version:"
          ),
          " ",
          stats.version,
          ".0 "
        ),
        React.createElement(
          "h3",
          { className: "hsTotal" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Rust High Score:"
          ),
          " ",
          stats.hsTotal,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsTotalT1" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Bronze High Score:"
          ),
          " ",
          stats.hsTotalT1,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsTotalT2" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Silver High Score:"
          ),
          " ",
          stats.hsTotalT2,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsTotalT3" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Gold High Score:"
          ),
          " ",
          stats.hsTotalT3,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hs18" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Android 18 High Score:"
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
            "Android 17 High Score:"
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
            "Victory High Score:"
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
          { className: "dominationsRR" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "RR Dominations:"
          ),
          " ",
          stats.dominationsRR,
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
        )
      );
    } else if (statsMain === false && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)) {
      return React.createElement(
        "div",
        { key: stats._id, className: "stats" },
        React.createElement(
          "h1",
          { className: "labled" },
          "Extra Statistics"
        ),
        React.createElement(
          "button",
          { className: "formSubmit2", onClick: function onClick() {
              changeStats();
            } },
          "Main Stats"
        ),
        React.createElement(
          "h3",
          { className: "exp" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Total Points:"
          ),
          " ",
          stats.exp,
          " "
        ),
        React.createElement(
          "h3",
          { className: "melee" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Melee Count:"
          ),
          " ",
          stats.melee,
          " "
        ),
        React.createElement(
          "h3",
          { className: "blasts" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Blast Count:"
          ),
          " ",
          stats.blasts,
          " "
        ),
        React.createElement(
          "h3",
          { className: "powerBlasts" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Power Blast Count:"
          ),
          " ",
          stats.powerBlasts,
          " "
        ),
        React.createElement(
          "h3",
          { className: "blocking" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Seconds Blocked:"
          ),
          " ",
          stats.blocking,
          " "
        ),
        React.createElement(
          "h3",
          { className: "shielding" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Seconds Shielded:"
          ),
          " ",
          stats.shielding,
          " "
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
        ),
        React.createElement(
          "h3",
          { className: "piccoloKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Piccolo Killed:"
          ),
          " ",
          stats.piccoloKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "vegetaKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Vegeta Killed:"
          ),
          " ",
          stats.vegetaKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "gohanKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Gohan Killed:"
          ),
          " ",
          stats.gohanKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "tienKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Tien Killed:"
          ),
          " ",
          stats.tienKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "krillinKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Krillin Killed:"
          ),
          " ",
          stats.krillinKill,
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

// function to compile and stat sheet
var ModsList = function ModsList(props) {

  console.log("modsLIST");

  if (props.statss.length === 0) {
    /* return (
    <div className="statsList">
    <h3 className="emptyStats">No Statistics accumulated</h3>
    </div>
    ); */
  }

  var modsNodes = props.statss.map(function (stats) {

    // set user
    user = stats.name;

    // set profile
    profilePic = stats.profile;

    // set version
    currentVersion = stats.version;

    //send data to game
    if (app.main.gameState != app.main.GAME_STATE.DEFAULT) {
      app.main.version = stats.version;
      app.main.exp = stats.exp;
      app.main.hsTotal = stats.hsTotal;
      app.main.hsTotalT1 = stats.hsTotalT1;
      app.main.hsTotalT2 = stats.hsTotalT2;
      app.main.hsTotalT3 = stats.hsTotalT3;
      app.main.hs18 = stats.hs18;
      app.main.hs17 = stats.hs17;
      app.main.victories = stats.victories;
      app.main.hsVictory = stats.hsVictory;
      app.main.kills = stats.kills;
      app.main.dominations = stats.dominations;
      app.main.dominationsRR = stats.dominationsRR;
      app.main.perfects = stats.perfects;
      app.main.destroyed = stats.destroyed;
      app.main.taunts = stats.taunts;
      app.main.teleports = stats.teleports;
      app.main.meleeStat = stats.melee;
      app.main.blastsStat = stats.blasts;
      app.main.powerBlasts = stats.powerBlasts;
      app.main.blockingCount = stats.blocking;
      app.main.shieldingCount = stats.shielding;
      app.main.piccoloKill = stats.piccoloKill;
      app.main.vegetaKill = stats.vegetaKill;
      app.main.gohanKill = stats.gohanKill;
      app.main.tienKill = stats.tienKill;
      app.main.krillinKill = stats.krillinKill;
      app.main.lootT1 = stats.lootT1;
      app.main.lootT2 = stats.lootT2;
      app.main.lootT3 = stats.lootT3;
      app.main.lootT4 = stats.lootT4;
      app.main.modsT1 = stats.modsT1;
      app.main.modsT2 = stats.modsT2;
      app.main.modsT3 = stats.modsT3;
      app.main.modsT4 = stats.modsT4;
      app.main.modsT5 = stats.modsT5;
    }
    if (modsMain === true && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)) {
      return React.createElement(
        "div",
        { key: stats._id, className: "modss" },
        React.createElement(
          "h1",
          { className: "labled" },
          "Modification Structure"
        ),
        React.createElement(
          "button",
          { className: "formSubmit2", onClick: function onClick() {
              changeStats();
            } },
          "Extra Stats"
        ),
        React.createElement(
          "div",
          { id: "modsDiv0" },
          React.createElement(
            "label",
            { "for": "mods0" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "b",
                null,
                "Tier 1"
              )
            )
          ),
          React.createElement("select", { ref: "mods0", name: "mods0", id: "mods0", size: "1", style: { width: 150 + 'px' } })
        ),
        React.createElement(
          "div",
          { id: "modsDiv1" },
          React.createElement(
            "label",
            { "for": "modsDiv1" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "b",
                null,
                "Tier 2"
              )
            )
          ),
          React.createElement("select", { ref: "mods1", name: "mods1", id: "mods1", size: "1", style: { width: 150 + 'px' } }),
          React.createElement("select", { ref: "mods2", name: "mods2", id: "mods2", size: "1", style: { width: 150 + 'px' } })
        ),
        React.createElement(
          "div",
          { id: "modsDiv2" },
          React.createElement(
            "label",
            { "for": "modsDiv2" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "b",
                null,
                "Tier 3"
              )
            )
          ),
          React.createElement("select", { ref: "mods3", name: "mods3", id: "mods3", size: "1", style: { width: 150 + 'px' } })
        ),
        React.createElement(
          "div",
          { id: "modsDiv3" },
          React.createElement(
            "label",
            { "for": "modsDiv3" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "b",
                null,
                "Tier 4"
              )
            )
          ),
          React.createElement("select", { ref: "mods4", name: "mods4", id: "mods4", size: "1", style: { width: 150 + 'px' } }),
          React.createElement("select", { ref: "mods5", name: "mods5", id: "mods5", size: "1", style: { width: 150 + 'px' } })
        ),
        React.createElement(
          "div",
          { id: "modsDiv4" },
          React.createElement(
            "label",
            { "for": "modsDiv4" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "b",
                null,
                "Tier 5"
              )
            )
          ),
          React.createElement("select", { ref: "mods6", name: "mods6", id: "mods6", size: "1", style: { width: 150 + 'px' } }),
          React.createElement("select", { ref: "mods7", name: "mods7", id: "mods7", size: "1", style: { width: 150 + 'px' } })
        )
      );
    } else if (modsMain === false && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)) {
      return React.createElement(
        "div",
        { key: stats._id, className: "stats" },
        React.createElement(
          "h1",
          { className: "labled" },
          "Modification Structure"
        ),
        React.createElement(
          "button",
          { className: "formSubmit2", onClick: function onClick() {
              changeStats();
            } },
          "Main Stats"
        ),
        React.createElement(
          "h3",
          { className: "exp" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Total Points:"
          ),
          " ",
          stats.exp,
          " "
        ),
        React.createElement(
          "h3",
          { className: "melee" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Melee Count:"
          ),
          " ",
          stats.melee,
          " "
        ),
        React.createElement(
          "h3",
          { className: "blasts" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Blast Count:"
          ),
          " ",
          stats.blasts,
          " "
        ),
        React.createElement(
          "h3",
          { className: "powerBlasts" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Power Blast Count:"
          ),
          " ",
          stats.powerBlasts,
          " "
        ),
        React.createElement(
          "h3",
          { className: "blocking" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Seconds Blocked:"
          ),
          " ",
          stats.blocking,
          " "
        ),
        React.createElement(
          "h3",
          { className: "shielding" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Seconds Shielded:"
          ),
          " ",
          stats.shielding,
          " "
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
        ),
        React.createElement(
          "h3",
          { className: "piccoloKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Piccolo Killed:"
          ),
          " ",
          stats.piccoloKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "vegetaKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Vegeta Killed:"
          ),
          " ",
          stats.vegetaKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "gohanKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Gohan Killed:"
          ),
          " ",
          stats.gohanKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "tienKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Tien Killed:"
          ),
          " ",
          stats.tienKill,
          " "
        ),
        React.createElement(
          "h3",
          { className: "krillinKills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Krillin Killed:"
          ),
          " ",
          stats.krillinKill,
          " "
        )
      );
    } else {
      return React.createElement("div", null);
    }
  });

  return React.createElement(
    "div",
    { className: "modsList" },
    modsNodes
  );
};

var submitProfile = function submitProfile() {
  profilePic = document.querySelector("#profileChange").value;
  quickStats();
  document.querySelector("#passwordButton").click();
};

var quickStats = function quickStats(csrf) {
  ReactDOM.render(React.createElement(StatsForm, { csrf: csrf, statss: [] }), document.querySelector("#makeStats"));
  document.querySelector("#statSubmit").click();
  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeStats"));
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

    var compareT1 = function compareT1(a, b) {
      if (a.hsTotalT1 > b.hsTotalT1) return -1;
      if (a.hsTotalT1 < b.hsTotalT1) return 1;
      return 0;
    };

    var compareT2 = function compareT2(a, b) {
      if (a.hsTotalT2 > b.hsTotalT2) return -1;
      if (a.hsTotalT2 < b.hsTotalT2) return 1;
      return 0;
    };

    var compareT3 = function compareT3(a, b) {
      if (a.hsTotalT3 > b.hsTotalT3) return -1;
      if (a.hsTotalT3 < b.hsTotalT3) return 1;
      return 0;
    };

    if (scoreState == 0) {
      hScores.sort(compare);
    } else if (scoreState == 2) {
      hScores.sort(compareT2);
    } else if (scoreState == 3) {
      hScores.sort(compareT3);
    } else if (scoreState == 4) {
      hScores.sort(compareT1);
    }
  }

  hScores.splice(5, 1000000000000); //Remove all extra scores

  var number = 0;

  var scoreNodes = void 0;

  var scoreType = void 0;

  if (scoreState === 1) {
    var _scoreNodes = hScores.map(function (score) {
      number++;

      return React.createElement("div", { className: "score" });
    });
  } else if (scoreState === 2) {
    scoreType = "/assets/images/RedRibbonSilver.png";
    scoreNodes = hScores.map(function (score) {
      number++;

      return React.createElement(
        "div",
        { className: "score" },
        React.createElement("img", { src: score.profile, alt: "stats face", className: "statsFace" }),
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
          React.createElement(
            "span",
            { className: "labled4" },
            " ",
            score.version,
            ".0"
          )
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
          score.hsTotalT2,
          " "
        )
      );
    });
  } else if (scoreState === 3) {
    scoreType = "/assets/images/RedRibbonGold.png";
    scoreNodes = hScores.map(function (score) {
      number++;

      return React.createElement(
        "div",
        { className: "score" },
        React.createElement("img", { src: score.profile, alt: "stats face", className: "statsFace" }),
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
          React.createElement(
            "span",
            { className: "labled4" },
            " ",
            score.version,
            ".0"
          )
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
          score.hsTotalT3,
          " "
        )
      );
    });
  } else if (scoreState === 4) {
    scoreType = "/assets/images/RedRibbonBronze.png";
    scoreNodes = hScores.map(function (score) {
      number++;

      return React.createElement(
        "div",
        { className: "score" },
        React.createElement("img", { src: score.profile, alt: "stats face", className: "statsFace" }),
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
          React.createElement(
            "span",
            { className: "labled4" },
            " ",
            score.version,
            ".0"
          )
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
          score.hsTotalT1,
          " "
        )
      );
    });
  } else {
    scoreType = "/assets/images/RedRibbonRust.png";
    scoreNodes = hScores.map(function (score) {
      number++;

      return React.createElement(
        "div",
        { className: "score" },
        React.createElement("img", { src: score.profile, alt: "stats face", className: "statsFace" }),
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
          React.createElement(
            "span",
            { className: "labled4" },
            " ",
            score.version,
            ".0"
          )
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
  }

  return React.createElement(
    "div",
    { className: "scoreList" },
    React.createElement(
      "div",
      { className: "buttonBlock" },
      React.createElement(
        "button",
        { className: "formSubmit3", onClick: function onClick() {
            changeScores(3);
          } },
        "Gold"
      ),
      React.createElement(
        "button",
        { className: "formSubmit3", onClick: function onClick() {
            changeScores(2);
          } },
        "Silver"
      ),
      React.createElement(
        "button",
        { className: "formSubmit3", onClick: function onClick() {
            changeScores(4);
          } },
        "Bronze"
      ),
      React.createElement(
        "button",
        { className: "formSubmit3", onClick: function onClick() {
            changeScores(0);
          } },
        "Rust"
      )
    ),
    React.createElement(
      "div",
      { className: "scoreType" },
      React.createElement("img", { src: scoreType, alt: "score type", className: "scoreFace" })
    ),
    scoreNodes
  );
};

// get request and react render for stats
var loadStatssFromServer = function loadStatssFromServer() {
  sendAjax('GET', '/getStatss', null, function (data) {
    ReactDOM.render(React.createElement(StatsList, { statss: data.statss }), document.querySelector("#statss"));
    if (statsScreen === false) {
      ReactDOM.render(React.createElement("div", null), document.querySelector("#statss"));
    }
  });
};

// get request and react render for stats
var loadModsFromServer = function loadModsFromServer() {
  sendAjax('GET', '/getStatss', null, function (data) {
    ReactDOM.render(React.createElement(ModsList, { statss: data.statss }), document.querySelector("#modsDivv"));
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

  populateMods();

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
    statsScreen = false;
    return false;
  });

  // actions for the stats page button
  statsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createStatsWindow(csrf);
    app.main.pausedGame();
    app.main.onScreen = false;
    paused = true;
    statsScreen = true;
    return false;
  });

  // actions for the mods page button
  modsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createModsWindow(csrf);
    app.main.pausedGame();
    app.main.onScreen = false;
    paused = true;
    statsScreen = false;
    return false;
  });

  // actions for the score page button
  scoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    createScoreWindow(csrf);
    app.main.pausedGame();
    app.main.onScreen = false;
    paused = true;
    statsScreen = false;
    return false;
  });

  // actions for the password page button
  profileButton.addEventListener("click", function (e) {
    statsScreen = false;
    profilePic = document.querySelector("#profileChange").value;
    quickStats(csrf);
    createPasswordWindow(csrf);
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

var changeStats = function changeStats() {
  app.main.sound.playEffect(68);
  if (statsMain === false) {
    statsMain = true;
  } else {
    statsMain = false;
  }
  loadStatssFromServer();
};

var changeScores = function changeScores(tier) {
  app.main.sound.playEffect(68);
  scoreState = tier;
  loadScoresFromServer();
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
var modsButton = document.querySelector("#modsButton");
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

//Function to populate initial modules
function populateMods() {
  var selectedGroup = 1;
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

  if (selectedGroup > 0) {
    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < modules[selectedGroup].length; i++) {
        console.log("SHOWING TEST");
        modsList[j].options[modsList[j].options.length] = new Option(modules[selectedGroup][i].split("|")[0], modules[selectedGroup][i].split("|")[1]);
        modsList[j].selectedIndex = "0";
      }
    }
  }
}

//Function to update currently used modules
function updateMods() {
  var selected = new Array();

  selected[0] = document.querySelector("#mods0").selectedIndex;
  selected[1] = document.querySelector("#mods1").selectedIndex;
  selected[2] = document.querySelector("#mods2").selectedIndex;
  selected[3] = document.querySelector("#mods3").selectedIndex;
  selected[4] = document.querySelector("#mods4").selectedIndex;
  selected[5] = document.querySelector("#mods5").selectedIndex;
  selected[6] = document.querySelector("#mods6").selectedIndex;
  selected[7] = document.querySelector("#mods7").selectedIndex;

  //Setup and update the array of mods
  var selectedGroup = 1;
  if (selected == 0) {
    selectedGroup = 0;
  }
  for (var x = 0; x < 8; x++) {
    modsList[x].options.length = 0;
  }
  if (selectedGroup > 0) {
    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < modules[selectedGroup].length; i++) {
        modsList[j].options[modsList[j].options.length] = new Option(modules[selectedGroup][i].split("|")[0], modules[selectedGroup][i].split("|")[1]);
        if (selected[0] != i && selected[1] != i && selected[2] != i && selected[3] != i && selected[4] != i && selected[5] != i && selected[6] != i && selected[7] != i) {
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
      if (changeFlow === false && flowTimer < 125) {
        flowTimer++;
        flowPosition -= 2;
      } else {
        changeFlow = true;
      }

      if (changeFlow === true && flowTimer > 0) {
        flowTimer--;
        flowPosition += 2;
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

var modsMain = true;
var statsMain = true;
var scoreState = 0;

var canvas = new Array();
var ctx = new Array();

var user = '';
var profilePic = '';
var currentVersion = 1;

var statsScreen = false;

var modules = new Array();
modules[0] = "";
modules[1] = ["Select|select", "Power Module|Power Module", "Speed Module|Speed Module", "Energy Module|Energy Module", "Defense Module|Defense Module", "Focus Chip|Focus Chip", "Creation Chip|Creation Chip", "Synchronous Chip|Synchronous Chip", "Intensification Chip|Intensification Chip", "Enhance Circuit|Enhance Circuit", "Mind Circuit|Mind Circuit", "Limiter Circuit|Limiter Circuit", "Mastery Circuit|Mastery Circuit", "Data of Piccolo|Data of Piccolo", "Data of Vegeta|Data of Vegeta", "Data of Gohan|Data of Gohan", "Data of Tien|Data of Tien", "Data of Krillin|Data of Krillin"];

//Turn mods into an array
var modsList = new Array();

var openSong = document.getElementById("openSong");
