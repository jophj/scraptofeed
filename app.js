const express = require('express');
const NyaaScraper = require('./nyaaScraper');
const EztvScraper = require('./eztvScraper');
const FeedGenerator = require('./feedGenerator');

const app = express();

app.use(function (req, res, next) {
  console.log('Requested resource:', req.originalUrl);
  next();
});

app.get('/jojo-diamond-unbreakable', function(req, res){
  res.set('Content-Type', 'text/xml');
  new NyaaScraper('horriblesubs jojo 720p diamond is unbreakable')
    .scrape(x => {
      res.send(new FeedGenerator().generateXML(x))
    });
});

app.get('/dragon-ball-super', function(req, res){
  res.set('Content-Type', 'text/xml');
  new NyaaScraper('dragon ball super 720p horriblesubs')
    .scrape(x => {
      res.send(new FeedGenerator().generateXML(x))
    });
});

app.get('/the-walking-dead', function(req, res){
  res.set('Content-Type', 'text/xml');
  new EztvScraper(428)
    .scrape(x => {
      res.send(new FeedGenerator().generateXML(x))
    });
});

app.listen(8091, function () {
  console.log('Scraptofeed listening on port 3000...');
});
