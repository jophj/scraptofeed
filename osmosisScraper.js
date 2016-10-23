const osmosis = require('osmosis');

class OsmosisScraper {
  constructor(searchString){
    this.data = []
    this.searchString = searchString;
  }

  scrape(callback){
    let that = this;
    osmosis
      .get('https://www.nyaa.se/?page=search&cats=0_0&filter=0', {term: this.searchString})
      .find('td.tlistname > a')
      .follow('@href')
      .find('.viewdownloadbutton > a')
      .set('url', '@href')
      .find('table.viewtable tr:nth-child(2) td.vtop')
      .set('date', 'text()')
      .find("td.viewtorrentname")
      .set("filename", "text()")
      .data(function(data) {
        that.data.push(data);
      })
      .error(console.log)
      .done(() => callback({
        title: that.searchString,
        description: that.searchString,
        items: that.data.map(x => {
          console.log(x.date, new Date(x.date));
          return {
            title: x.filename,
            description: x.description,
            url: 'http://' + x.url.substring(2),
            date: new Date(x.date)
          }
        }).filter((e, i, array) => {
          return i + 1 < array.length && array[i].title != array[i + 1].title;
        })
      }));
  }
}

module.exports = OsmosisScraper;