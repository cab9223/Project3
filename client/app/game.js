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
	  <input id="oldPass" type="password" name="oldPass" placeholder="old password"/>
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
  $("#visuals3").children().hide();
	
  ReactDOM.render(
	<div />, document.querySelector("#makeStats")
  );
  
  $("#makeStats").children().hide();
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#modsDivv")
  );
	
  ReactDOM.render(
    <PasswordWindow csrf={csrf} />,
	document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div> <img src={profilePic} alt="Profile Not Available" className="profilePic" /> </div>, 
	document.querySelector("#profile")
  );
  
  /* ReactDOM.render(
    <profileChange />,
	document.querySelector("#borderSideBack")
  ); */
  
  //profilePull();
  
};

// call for building the stats display
const createStatsWindow = (csrf) => {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().show();
  $("#visuals3").children().hide();
  
  ReactDOM.render(
    <div />, document.querySelector("#profile")
  );
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeStats")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#modsDivv")
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

// call for building the stats display
const createModsWindow = (csrf) => {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().hide();
  $("#visuals3").children().show();
  
  ReactDOM.render(
    <div />, document.querySelector("#profile")
  );
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeStats")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
  
  
  
  //document.querySelector("#statsForm").submit();
  
  //loadModsFromServer();
  
  //populateMods();
};

// call for building the high score display
const createScoreWindow = (csrf) => {
  $("#userM").text("");
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().show();
  $("#visuals3").children().hide();
  
  ReactDOM.render(
    <div />, document.querySelector("#profile")
  );
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeStats")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#modsDivv")
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
  $("#visuals3").children().hide();
	
  ReactDOM.render(
    <StatsForm csrf={csrf} statss={[]}/>, document.querySelector("#makeStats")
  );
  
  $("#makeStats").children().hide();
  
  if(userNew === true){
    document.querySelector("#statSubmit").click();
	userNew = false;
  }
  
  ReactDOM.render(
    <div />, document.querySelector("#profile")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#statss")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#modsDivv")
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
	console.log("statsForm@@@@@@@@@@@@@");
    return (
	<form id="statsForm"
	  onSubmit={handleStats}
	  name="statsForm"
	  action="/game"
	  method="POST"
	  className="statsForm"
	>
	  <input id="name" type="text" name="name" placeholder="name"/>
	  <input id="version" type="text" name="version" value={app.main.version}/>
	  <input id="exp" type="text" name="exp" value={app.main.exp}/>
	  <input id="profile" type="text" name="profile" value={profilePic}/>
	  <input id="hsTotal" type="text" name="hsTotal" value={app.main.hsTotal}/>
	  <input id="hsTotalT1" type="text" name="hsTotalT1" value={app.main.hsTotalT1}/>
	  <input id="hsTotalT2" type="text" name="hsTotalT2" value={app.main.hsTotalT2}/>
	  <input id="hsTotalT3" type="text" name="hsTotalT3" value={app.main.hsTotalT3}/>
	  <input id="hs18" type="text" name="hs18" value={app.main.hs18}/>
	  <input id="hs17" type="text" name="hs17" value={app.main.hs17}/>
	  <input id="recentVictory" type="boolean" name="recentVictory" value={app.main.recentVictory}/>
	  <input id="victories" type="text" name="victories" value={app.main.victories}/>
	  <input id="hsVictory" type="text" name="hsVictory" value={app.main.hsVictory}/>
	  <input id="kills" type="text" name="kills" value={app.main.kills}/>
	  <input id="recentDomination" type="boolean" name="recentDomination" value={app.main.recentDomination}/>
	  <input id="dominations" type="text" name="dominations" value={app.main.dominations}/>
	  <input id="dominationsRR" type="text" name="dominationsRR" value={app.main.dominationsRR}/>
	  <input id="recentPerfect" type="boolean" name="recentPerfect" value={app.main.recentPerfect}/>
	  <input id="perfects" type="text" name="perfects" value={app.main.perfects}/>
	  <input id="destroyed" type="text" name="destroyed" value={app.main.destroyed}/>
	  <input id="taunts" type="text" name="taunts" value={app.main.taunts}/>
	  <input id="teleports" type="text" name="teleports" value={app.main.teleports}/>
	  <input id="melee" type="text" name="melee" value={app.main.meleeStat}/>
	  <input id="blasts" type="text" name="blasts" value={app.main.blastsStat}/>
	  <input id="powerBlasts" type="text" name="powerBlasts" value={app.main.powerBlasts}/>
	  <input id="blocking" type="text" name="blocking" value={app.main.blockingCount}/>
	  <input id="shielding" type="text" name="shielding" value={app.main.shieldingCount}/>
	  <input id="piccoloKill" type="text" name="piccoloKill" value={app.main.piccoloKill}/>
	  <input id="vegetaKill" type="text" name="vegetaKill" value={app.main.vegetaKill}/>
	  <input id="gohanKill" type="text" name="gohanKill" value={app.main.gohanKill}/>
	  <input id="tienKill" type="text" name="tienKill" value={app.main.tienKill}/>
	  <input id="krillinKill" type="text" name="krillinKill" value={app.main.krillinKill}/>
	  <input id="lootT1" type="text" name="lootT1" value={app.main.lootT1}/>
	  <input id="lootT2" type="text" name="lootT2" value={app.main.lootT2}/>
	  <input id="lootT3" type="text" name="lootT3" value={app.main.lootT3}/>
	  <input id="lootT4" type="text" name="lootT4" value={app.main.lootT4}/>
	  <input id="modsT1" type="text" name="modsT1" value={app.main.modsT1}/>
	  <input id="modsT2" type="text" name="modsT2" value={app.main.modsT2}/>
	  <input id="modsT3" type="text" name="modsT3" value={app.main.modsT3}/>
	  <input id="modsT4" type="text" name="modsT4" value={app.main.modsT4}/>
	  <input id="modsT5" type="text" name="modsT5" value={app.main.modsT5}/>
	  
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
	
	// set profile
	profilePic = stats.profile;
	
	// set version
	currentVersion = stats.version;
    
	//send data to game
	if(app.main.gameState != app.main.GAME_STATE.DEFAULT){
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
	if(statsMain === true && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)){
	return (
	  <div key={stats._id} className="stats">
	    <h1 className="labled">Main Statistics</h1>
		<button className="formSubmit2" onClick={() => {changeStats()}}>Extra Stats</button>
		<h3 className="version"> <span className="labled2">System Version:</span> {stats.version}.0 </h3>
		<h3 className="hsTotal"> <span className="labled2">Rust High Score:</span> {stats.hsTotal} </h3>
		<h3 className="hsTotalT1"> <span className="labled2">Bronze High Score:</span> {stats.hsTotalT1} </h3>
		<h3 className="hsTotalT2"> <span className="labled2">Silver High Score:</span> {stats.hsTotalT2} </h3>
		<h3 className="hsTotalT3"> <span className="labled2">Gold High Score:</span> {stats.hsTotalT3} </h3>
		<h3 className="hs18">  <span className="labled2">Android 18 High Score:</span> {stats.hs18} </h3>
		<h3 className="hs17">  <span className="labled2">Android 17 High Score:</span> {stats.hs17} </h3>
		<h3 className="victories">  <span className="labled2">Victories:</span> {stats.victories} </h3>
		<h3 className="hsVictory">  <span className="labled2">Victory High Score:</span> {stats.hsVictory} </h3>
		<h3 className="kills">  <span className="labled2">Total Kills:</span> {stats.kills} </h3>
		<h3 className="dominations">  <span className="labled2">Dominations:</span> {stats.dominations} </h3>
		<h3 className="dominationsRR">  <span className="labled2">RR Dominations:</span> {stats.dominationsRR} </h3>
		<h3 className="perfects">  <span className="labled2">Perfects:</span> {stats.perfects} </h3>
		<h3 className="destroyed">  <span className="labled2">Destroyed:</span> {stats.destroyed} </h3>
	  </div>
    );
	} else if(statsMain === false && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)){
	  return (
	  <div key={stats._id} className="stats">
	    <h1 className="labled">Extra Statistics</h1>
		<button className="formSubmit2" onClick={() => {changeStats()}}>Main Stats</button>
		<h3 className="exp">  <span className="labled2">Total Points:</span> {stats.exp} </h3>
		<h3 className="melee">  <span className="labled2">Melee Count:</span> {stats.melee} </h3>
		<h3 className="blasts">  <span className="labled2">Blast Count:</span> {stats.blasts} </h3>
		<h3 className="powerBlasts">  <span className="labled2">Power Blast Count:</span> {stats.powerBlasts} </h3>
		<h3 className="blocking">  <span className="labled2">Seconds Blocked:</span> {stats.blocking} </h3>
		<h3 className="shielding">  <span className="labled2">Seconds Shielded:</span> {stats.shielding} </h3>
		<h3 className="taunts">  <span className="labled2">Taunts:</span> {stats.taunts} </h3>
		<h3 className="teleports">  <span className="labled2">Super Speeds:</span> {stats.teleports} </h3>
		<h3 className="piccoloKills">  <span className="labled2">Piccolo Killed:</span> {stats.piccoloKill} </h3>
		<h3 className="vegetaKills">  <span className="labled2">Vegeta Killed:</span> {stats.vegetaKill} </h3>
		<h3 className="gohanKills">  <span className="labled2">Gohan Killed:</span> {stats.gohanKill} </h3>
		<h3 className="tienKills">  <span className="labled2">Tien Killed:</span> {stats.tienKill} </h3>
		<h3 className="krillinKills">  <span className="labled2">Krillin Killed:</span> {stats.krillinKill} </h3>
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


// function to compile and stat sheet
const ModsList = function(props) {
	
	console.log("modsLIST");
	
	
  if(props.statss.length === 0) {
      /* return (
	  <div className="statsList">
	    <h3 className="emptyStats">No Statistics accumulated</h3>
      </div>
	  ); */
  }
  
  const modsNodes = props.statss.map(function(stats) {
	  
	// set user
	user = stats.name;
	
	// set profile
	profilePic = stats.profile;
	
	// set version
	currentVersion = stats.version;
    
	//send data to game
	if(app.main.gameState != app.main.GAME_STATE.DEFAULT){
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
	if(modsMain === true && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)){
	return (
	  <div key={stats._id} className="modss">
	    <h1 className="labled">Modification Structure</h1>
		<button className="formSubmit2" onClick={() => {changeStats()}}>Extra Stats</button>
	  <div id="modsDiv0">
	  <label for="mods0"><p><b>Tier 1</b></p></label>
	  <select ref="mods0" name="mods0" id="mods0" size="1" style={{width: 150 + 'px'}}>
	  </select>
	  </div>
	  <div id="modsDiv1">
	    <label for="modsDiv1"><p><b>Tier 2</b></p></label>
	    <select ref="mods1" name="mods1" id="mods1" size="1" style={{width: 150 + 'px'}}>
	    </select>
	    <select ref="mods2" name="mods2" id="mods2" size="1" style={{width: 150 + 'px'}}>
        </select>
	  </div>
	  <div id="modsDiv2">
	    <label for="modsDiv2"><p><b>Tier 3</b></p></label>
	    <select ref="mods3" name="mods3" id="mods3" size="1" style={{width: 150 + 'px'}}>
	    </select>
	  </div>
	  <div id="modsDiv3">
	    <label for="modsDiv3"><p><b>Tier 4</b></p></label>
	    <select ref="mods4" name="mods4" id="mods4" size="1" style={{width: 150 + 'px'}}>
	    </select>
	    <select ref="mods5" name="mods5" id="mods5" size="1" style={{width: 150 + 'px'}}>
        </select>
	  </div>
	  <div id="modsDiv4">
	    <label for="modsDiv4"><p><b>Tier 5</b></p></label>
	    <select ref="mods6" name="mods6" id="mods6" size="1" style={{width: 150 + 'px'}}>
	    </select>
	    <select ref="mods7" name="mods7" id="mods7" size="1" style={{width: 150 + 'px'}}>
        </select>
	  </div>
	  </div>
    );
	} else if(modsMain === false && (app.main.loaded === true || paused === false || app.main.gameState === app.main.GAME_STATE.Victory)){
	  return (
	  <div key={stats._id} className="stats">
	    <h1 className="labled">Modification Structure</h1>
		<button className="formSubmit2" onClick={() => {changeStats()}}>Main Stats</button>
		<h3 className="exp">  <span className="labled2">Total Points:</span> {stats.exp} </h3>
		<h3 className="melee">  <span className="labled2">Melee Count:</span> {stats.melee} </h3>
		<h3 className="blasts">  <span className="labled2">Blast Count:</span> {stats.blasts} </h3>
		<h3 className="powerBlasts">  <span className="labled2">Power Blast Count:</span> {stats.powerBlasts} </h3>
		<h3 className="blocking">  <span className="labled2">Seconds Blocked:</span> {stats.blocking} </h3>
		<h3 className="shielding">  <span className="labled2">Seconds Shielded:</span> {stats.shielding} </h3>
		<h3 className="taunts">  <span className="labled2">Taunts:</span> {stats.taunts} </h3>
		<h3 className="teleports">  <span className="labled2">Super Speeds:</span> {stats.teleports} </h3>
		<h3 className="piccoloKills">  <span className="labled2">Piccolo Killed:</span> {stats.piccoloKill} </h3>
		<h3 className="vegetaKills">  <span className="labled2">Vegeta Killed:</span> {stats.vegetaKill} </h3>
		<h3 className="gohanKills">  <span className="labled2">Gohan Killed:</span> {stats.gohanKill} </h3>
		<h3 className="tienKills">  <span className="labled2">Tien Killed:</span> {stats.tienKill} </h3>
		<h3 className="krillinKills">  <span className="labled2">Krillin Killed:</span> {stats.krillinKill} </h3>
	  </div>
      );
	} else {
	  return (<div />);
	}
  });
  
  return (
    <div className="modsList">
	  {modsNodes}
	</div>
  );
};


const submitProfile = function() {
	profilePic = document.querySelector("#profileChange").value;
    quickStats();
	document.querySelector("#passwordButton").click();
};

const quickStats = function(csrf) {
  ReactDOM.render(
	<StatsForm csrf={csrf} statss={[]}/>, document.querySelector("#makeStats")
  );
  document.querySelector("#statSubmit").click();
  ReactDOM.render(
	<div />, document.querySelector("#makeStats")
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
  function compareT1(a,b) {
    if (a.hsTotalT1 > b.hsTotalT1)
      return -1;
    if (a.hsTotalT1 < b.hsTotalT1)
      return 1;
    return 0;
  }
  
  function compareT2(a,b) {
    if (a.hsTotalT2 > b.hsTotalT2)
      return -1;
    if (a.hsTotalT2 < b.hsTotalT2)
      return 1;
    return 0;
  }
  function compareT3(a,b) {
    if (a.hsTotalT3 > b.hsTotalT3)
      return -1;
    if (a.hsTotalT3 < b.hsTotalT3)
      return 1;
    return 0;
  }
  
  if(scoreState == 0){
    hScores.sort(compare);
  } else if(scoreState == 2){
    hScores.sort(compareT2);
  } else if(scoreState == 3){
    hScores.sort(compareT3);
  } else if(scoreState == 4){
    hScores.sort(compareT1);
  }
  
  }
  
  
  hScores.splice(5,1000000000000); //Remove all extra scores
  
  let number = 0;
  
  let scoreNodes;
  
  let scoreType;
  
  if(scoreState === 1){
  const scoreNodes = hScores.map(function(score) {
	number++;
	
	return (
	  <div className="score">
	  </div>
      );
    
  });
  } else if(scoreState === 2){
	  scoreType = "/assets/images/RedRibbonSilver.png";
  scoreNodes = hScores.map(function(score) {
	number++;
	
	return (
	  <div className="score">
	    <img src={score.profile} alt="stats face" className="statsFace" />
		<h3 className="scores"> <span className="labled3">{number}</span> </h3>
		<h3 className="scores"> <span className="labled2">Identity:</span> {score.name}<span className="labled4"> {score.version}.0</span></h3>
		<h3 className="scores"> <span className="labled2">Score:</span> {score.hsTotalT2} </h3>
	  </div>
      );
    
  });
  } else if(scoreState === 3){
	  scoreType = "/assets/images/RedRibbonGold.png";
  scoreNodes = hScores.map(function(score) {
	number++;
	
	return (
	  <div className="score">
	    <img src={score.profile} alt="stats face" className="statsFace" />
		<h3 className="scores"> <span className="labled3">{number}</span> </h3>
		<h3 className="scores"> <span className="labled2">Identity:</span> {score.name}<span className="labled4"> {score.version}.0</span></h3>
		<h3 className="scores"> <span className="labled2">Score:</span> {score.hsTotalT3} </h3>
	  </div>
      );
    
  });
  } else if(scoreState === 4){
	  scoreType = "/assets/images/RedRibbonBronze.png";
  scoreNodes = hScores.map(function(score) {
	number++;
	
	return (
	  <div className="score">
	    <img src={score.profile} alt="stats face" className="statsFace" />
		<h3 className="scores"> <span className="labled3">{number}</span> </h3>
		<h3 className="scores"> <span className="labled2">Identity:</span> {score.name}<span className="labled4"> {score.version}.0</span></h3>
		<h3 className="scores"> <span className="labled2">Score:</span> {score.hsTotalT1} </h3>
	  </div>
      );
    
  });
  } else {
	  scoreType = "/assets/images/RedRibbonRust.png";
	  scoreNodes = hScores.map(function(score) {
	  number++;
	
	  return (
	  <div className="score">
	    <img src={score.profile} alt="stats face" className="statsFace" />
		<h3 className="scores"> <span className="labled3">{number}</span> </h3>
		<h3 className="scores"> <span className="labled2">Identity:</span> {score.name}<span className="labled4"> {score.version}.0</span></h3>
		<h3 className="scores"> <span className="labled2">Score:</span> {score.hsTotal} </h3>
	  </div>
      );
    
    });
  }
  
  return (
    <div className="scoreList">
	  <div className="buttonBlock">
	  <button className="formSubmit3" onClick={() => {changeScores(3)}}>Gold</button>
	  <button className="formSubmit3" onClick={() => {changeScores(2)}}>Silver</button>
	  <button className="formSubmit3" onClick={() => {changeScores(4)}}>Bronze</button>
	  <button className="formSubmit3" onClick={() => {changeScores(0)}}>Rust</button>
	  </div>
	  <div className="scoreType">
	  <img src={scoreType} alt="score type" className="scoreFace" />
	  </div>
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
	if(statsScreen === false){
	  ReactDOM.render(
        <div />, document.querySelector("#statss")
      );
    }
  });
};

// get request and react render for stats
const loadModsFromServer = () => {
  sendAjax('GET', '/getStatss', null, (data) => {
    ReactDOM.render(
      <ModsList statss={data.statss} />, document.querySelector("#modsDivv")
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
  
  populateMods();
  
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
	statsScreen = false;
	return false;
  });
  
  // actions for the stats page button
  statsButton.addEventListener("click", (e) => {
    e.preventDefault();
	createStatsWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	statsScreen = true;
	return false;
  });
  
  // actions for the mods page button
  modsButton.addEventListener("click", (e) => {
    e.preventDefault();
	createModsWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	statsScreen = false;
	return false;
  });
  
  // actions for the score page button
  scoreButton.addEventListener("click", (e) => {
    e.preventDefault();
	createScoreWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	statsScreen = false;
	return false;
  });
  
  // actions for the password page button
  profileButton.addEventListener("click", (e) => {
	statsScreen = false;
	profilePic = document.querySelector("#profileChange").value;
    quickStats(csrf);
	createPasswordWindow(csrf);
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

const changeStats = function(){
  app.main.sound.playEffect(68);
  if(statsMain === false){
	  statsMain = true;
  } else {
	  statsMain = false;
  }
  loadStatssFromServer();
};

const changeScores = function(tier){
  app.main.sound.playEffect(68);
  scoreState = tier;
  loadScoresFromServer();
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
const modsButton = document.querySelector("#modsButton");
const scoreButton = document.querySelector("#scoreButton");
const gameButton = document.querySelector("#gameButton");

// for new user data
let userNew = false;
