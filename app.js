const express = require('express');
const OsmosisScraper = require('./osmosisScraper');
const FeedGenerator = require('./feedGenerator');

const app = express();

app.use(function (req, res, next) {
  console.log('Requested resource:', req.originalUrl);
  next();
});

app.get('/jojo-diamond-unbreakable', function(req, res){
  res.set('Content-Type', 'text/xml');
  new OsmosisScraper('horriblesubs jojo 720p diamond is unbreakable')
    .scrape(x => {
      res.send(new FeedGenerator().generateXML(x))
    }
    );
});

app.get('/dragon-ball-super', function(req, res){
  res.set('Content-Type', 'text/xml');
  new OsmosisScraper('dragon ball super 720p kamifs 10bit')
    .scrape(x => {
      res.send(new FeedGenerator().generateXML(x))
    }
    );
});

app.listen(8091, function () {
  console.log('Scraptofeed listening on port 3000...');
});
