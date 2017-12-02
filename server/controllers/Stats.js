const models = require('../models');

const Stats = models.Stats;

// gets the current players game stats page
const gamePage = (req, res) => {
  Stats.StatsModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), statss: docs });
  });
};

// gets the high score page
const scorePage = (req, res) => {
  Stats.StatsModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), scores: docs });
  });
};

// build current stats data
const makeStats = (req, res) => {
  // remove old stats
  Stats.StatsModel.removeByOwner(req.session.account._id, (errr, data) => {
    if (errr || !data) {
      return data;
    }
    return data;
  });


  // prepare to set stats
  const statsData = {
    name: req.session.account.username,
    hsTotal: req.body.hsTotal,
    hs18: req.body.hs18,
    hs17: req.body.hs17,
    recentVictory: req.body.recentVictory,
    victories: req.body.victories,
    hsVictory: req.body.hsVictory,
    kills: req.body.kills,
    recentDomination: req.body.recentDomination,
    dominations: req.body.dominations,
    recentPerfect: req.body.recentPerfect,
    perfects: req.body.perfects,
    destroyed: req.body.destroyed,
    taunts: req.body.taunts,
    teleports: req.body.teleports,
    owner: req.session.account._id,
  };

  // send stats to database
  const newStats = new Stats.StatsModel(statsData);

  const statsPromise = newStats.save();

  statsPromise.then(() => res.json({ redirect: '/game' }));

  statsPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Data already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return statsPromise;
};

// check stats
const getStatss = (request, response) => {
  const req = request;
  const res = response;

  return Stats.StatsModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ statss: docs });
  });
};

// check scores
const getScores = (request, response) => {
  const res = response;

  return Stats.StatsModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ scores: docs });
  });
};

// get high score list data
const getHighScores = (request, response) => {
  const req = request;
  const res = response;

  return Stats.StatsModel.findByScore(req.body.search, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ scores: docs });
  });
};

// exports
module.exports.gamePage = gamePage;
module.exports.scorePage = scorePage;
module.exports.getStatss = getStatss;
module.exports.getScores = getScores;
module.exports.getHighScores = getHighScores;
module.exports.make = makeStats;

