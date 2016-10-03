const RSS = require('rss');

class FeedGenerator{

  generateXML(data){
    var feed = new RSS({
      title: data.title,
      description: data.description
    });

    var feedItems = data.items.map(i => {
      return {
        title: i.title,
        description: i.description,
        url: i.url,
        date: i.date
      }
    });

    feedItems.forEach(function(i){
      feed.item(i);
    });

    return feed.xml();
  }
}

module.exports = FeedGenerator;