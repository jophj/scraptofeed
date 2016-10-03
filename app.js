const express = require('express');
const JojoFeed = require('./osmosisScraper');
const FeedGenerator = require('./feedGenerator');

const app = express();


app.get('/jojo', function(req, res){
  res.set('Content-Type', 'text/xml');
  new JojoFeed('horriblesubs jojo 720p crusaders')
    .scrape(x =>
      res.send(new FeedGenerator().generateXML(x))
    );
});

app.listen(3000, function () {
  console.log('Scraptofeed listening on port 3000...');
});