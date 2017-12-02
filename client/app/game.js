// process passwork change input
const handlePassword = (e) => {
  e.preventDefault();
  
  if($("#oldPass").val() == '' || $("#pass").val() == '' || $("pass2").val() == '') {
    handleError("All fields required");
	return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords must match");
	return false;
  } 

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};  


// display data for password change form
const PasswordWindow = (props) => {
  return (
  
    <form id="passwordForm"
	  name="passwordForm"
	  onSubmit={handlePassword}
	  action="/passwordChange"
	  method="POST"
	  className="mainForm"
	>
	  <label htmlFor="oldPass">Old Pass: </label>
	  <input id="oldPass" type="password" name="oldPass" placeholder="old passwold"/>
	  <label htmlFor="pass">New Pass: </label>
	  <input id="pass" type="password" name="pass" placeholder="password"/>
	  <label htmlFor="pass2">New Pass: </label>
	  <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
	  <input type="hidden" name="_csrf" value={props.csrf} />
	  <input className="formSubmit" type="submit" value="Submit" />
	
	</form>
  );
};

// call for building the password change display
const createPasswordWindow = (csrf) => {
  $("#userM").text(user);
  $("#mainMessage").text("Mod Password");
  $("#errorMessage").text("...Awaiting...");
	
  $("#container").children().hide();
  
  $("#visuals").children().show();
  $("#visuals2").children().hide();
	
  ReactDOM.render(
    <div />, document.querySelector("#makeStats")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
	
  ReactDOM.render(
    <PasswordWindow csrf={csrf} />,
	document.querySelector("#moreContent")
  );
};

// call for building the stats display
const createStatsWindow = (csrf) => {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().show();
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeStats")
  );
  
  /* ReactDOM.render(
    <StatsForm statss={[]} />, document.querySelector("#statss")
  ); */
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
  
  
  //document.querySelector("#statsForm").submit();
  
  loadStatssFromServer();
};

// call for building the high score display
const createScoreWindow = (csrf) => {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().show();
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeStats")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  loadScoresFromServer();
};

// call for building the game display
const createGameWindow = (csrf) => {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().show();
	
  $("#makeStats").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().hide();
	
  ReactDOM.render(
    <StatsForm csrf={csrf} statss={[]}/>, document.querySelector("#makeStats")
  );
  
  $("#makeStats").children().hide();
  
  if(userNew === true){
    document.querySelector("#statSubmit").click();
	userNew = false;
  }
  
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );

};

// sends stats to server
const handleStats = (e) => {
  e.preventDefault();
  
  sendAjax('POST', $("#statsForm").attr("action"), $("#statsForm").serialize(), function() {
	loadStatssFromServer();
  });
  
  return false;
};

// creates form to game to input its stats
const StatsForm = (props) => {
    return (
	<form id="statsForm"
	  onSubmit={handleStats}
	  name="statsForm"
	  action="/game"
	  method="POST"
	  className="statsForm"
	>
	  <input id="name" type="text" name="name" placeholder="name"/>
	  <input id="hsTotal" type="text" name="hsTotal" value={app.main.hsTotal}/>
	  <input id="hs18" type="text" name="hs18" value={app.main.hs18}/>
	  <input id="hs17" type="text" name="hs17" value={app.main.hs17}/>
	  <input id="recentVictory" type="boolean" name="recentVictory" value={app.main.recentVictory}/>
	  <input id="victories" type="text" name="victories" value={app.main.victories}/>
	  <input id="hsVictory" type="text" name="hsVictory" value={app.main.hsVictory}/>
	  <input id="kills" type="text" name="kills" value={app.main.kills}/>
	  <input id="recentDomination" type="boolean" name="recentDomination" value={app.main.recentDomination}/>
	  <input id="dominations" type="text" name="dominations" value={app.main.dominations}/>
	  <input id="recentPerfect" type="boolean" name="recentPerfect" value={app.main.recentPerfect}/>
	  <input id="perfects" type="text" name="perfects" value={app.main.perfects}/>
	  <input id="destroyed" type="text" name="destroyed" value={app.main.destroyed}/>
	  <input id="taunts" type="text" name="taunts" value={app.main.taunts}/>
	  <input id="teleports" type="text" name="teleports" value={app.main.teleports}/>
	  <input type="hidden" name="_csrf" value={props.csrf} />
	  <input className="formSubmit" id="statSubmit" type="submit" value="Submit" />
	</form>
  );
};

// function to compile and stat sheet
const StatsList = function(props) {
	
	
  if(props.statss.length === 0) {
      /* return (
	  <div className="statsList">
	    <h3 className="emptyStats">No Statistics accumulated</h3>
      </div>
	  ); */
	userNew = true;
  }
  
  const statsNodes = props.statss.map(function(stats) {
	  
	// set user
	user = stats.name;
    
	//send data to game
	if(app.main.gameState != app.main.GAME_STATE.DEFAULT){
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
	if(app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory){
	return (
	  <div key={stats._id} className="stats">
	    <h1 className="labled">Statistics</h1>
		<h3 className="name"> <span className="labled2">Indentity:</span> {stats.name} </h3>
		<h3 className="hsTotal"> <span className="labled2">Total High Score:</span> {stats.hsTotal} </h3>
		<h3 className="hs18">  <span className="labled2">High Android 18 Score:</span> {stats.hs18} </h3>
		<h3 className="hs17">  <span className="labled2">High Android 17 Score:</span> {stats.hs17} </h3>
		<h3 className="victories">  <span className="labled2">Victories:</span> {stats.victories} </h3>
		<h3 className="hsVictory">  <span className="labled2">High Victory Score:</span> {stats.hsVictory} </h3>
		<h3 className="kills">  <span className="labled2">Total Kills:</span> {stats.kills} </h3>
		<h3 className="dominations">  <span className="labled2">Dominations:</span> {stats.dominations} </h3>
		<h3 className="perfects">  <span className="labled2">Perfects:</span> {stats.perfects} </h3>
		<h3 className="destroyed">  <span className="labled2">Destroyed:</span> {stats.destroyed} </h3>
		<h1 className="labled"> Extra Stats </h1>
		<h3 className="taunts">  <span className="labled2">Taunts:</span> {stats.taunts} </h3>
		<h3 className="teleports">  <span className="labled2">Super Speeds:</span> {stats.teleports} </h3>
	  </div>
    );
	} else {
	  return (<div />);
	}
  });
  
  return (
    <div className="statsList">
	  {statsNodes}
	</div>
  );
};

// get scores and build a high score list
const ScoreList = function(props) {
  if(props.scores.length === 0) {
    return (
	  <div className="statsList">
	    <h3 className="emptyStats">No Scores accumulated</h3>
      </div>
	);
  }
  
  let hScores = props.scores;
  
  
  if(props.scores.length > 1) {
  
  // sort the all current scores
  function compare(a,b) {
    if (a.hsTotal > b.hsTotal)
      return -1;
    if (a.hsTotal < b.hsTotal)
      return 1;
    return 0;
  }
  
  hScores.sort(compare);
  
  }
  
  
  hScores.splice(5,1000000000000); //Remove all extra scores
  
  let number = 0;
  
  const scoreNodes = hScores.map(function(score) {
	number++;
	
	return (
	  <div className="score">
	    <img src="/assets/images/RedRibbon.png" alt="stats face" className="statsFace" />
		<h3 className="scores"> <span className="labled3">{number}</span> </h3>
		<h3 className="scores"> <span className="labled2">Identity:</span> {score.name} </h3>
		<h3 className="scores"> <span className="labled2">Score:</span> {score.hsTotal} </h3>
	  </div>
      );
    
  });
  
  
  return (
    <div className="scoreList">
	  {scoreNodes}
	</div>
  );
};

// get request and react render for stats
const loadStatssFromServer = () => {
  sendAjax('GET', '/getStatss', null, (data) => {
    ReactDOM.render(
      <StatsList statss={data.statss} />, document.querySelector("#statss")
    );
  });
};

// get request and react render for scores
const loadScoresFromServer = () => {
  sendAjax('GET', '/getScores', null, (data) => {
    ReactDOM.render(
      <ScoreList scores={data.scores} />, document.querySelector("#scores")
    );
  });
};

const setup = function(csrf) {

  // prepare canvas
  canvas[0] = document.querySelector('#canvasBack');
  ctx[0] = canvas[0].getContext('2d');
  
  // actions for the password page button
  passwordButton.addEventListener("click", (e) => {
    e.preventDefault();
	app.main.pausedGame();
	createPasswordWindow(csrf);
	app.main.onScreen = false;
	paused = true;
	return false;
  });
  
  // actions for the game page button
  gameButton.addEventListener("click", (e) => {
    e.preventDefault();
	createGameWindow(csrf);
	//app.main.pausedGame();
	app.main.onScreen = true;
	app.main.sound.playEffect(66);
	if((app.main.gameState != app.main.GAME_STATE.DEFAULT && app.main.gameState != app.main.GAME_STATE.TUTORIAL)
	  || app.main.introState == true || app.main.endingState == true || app.main.specialScene == true){
	  app.main.resumeGame();
	}
	return false;
  });
  
  // actions for the stats page button
  statsButton.addEventListener("click", (e) => {
    e.preventDefault();
	createStatsWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	return false;
  });
  
  // actions for the score page button
  scoreButton.addEventListener("click", (e) => {
    e.preventDefault();
	createScoreWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	return false;
  });
  
  // to prepare stats
  ReactDOM.render(
    <StatsForm csrf={csrf} statss={[]}/>, document.querySelector("#makeStats")
  );
  
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
const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});

// setup buttons
const passwordButton = document.querySelector("#passwordButton");
const statsButton = document.querySelector("#stat");
const scoreButton = document.querySelector("#scoreButton");
const gameButton = document.querySelector("#gameButton");

// for new user data
let userNew = false;
