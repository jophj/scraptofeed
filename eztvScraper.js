const osmosis = require('osmosis');

class EztvScraper {
  constructor(showId){
    this.data = []
    this.showId = showId;
  }

  scrape(callback) {
    let that = this;
    osmosis
      .get(`https://eztv.ag/shows/${this.showId}/`)
      .set('showName', 'span[itemprop=name]')
      .find('table.forum_header_noborder')
      .find('tr.forum_header_border:nth-child(5)')
      .find('td.forum_thread_post:nth-child(2) > a:contains("720p")')
      .follow('@href')
      .set('url', 'a.magnet@href')
      .set('dateString', 'table.episode_columns_holder + table td')
      .set("fileNameString", 'td.episode_middle_column + td > table table td')
      .set("releaseName", '.section_post_header')
      .data(function(data) {
        that.data.push(data);
      })
      .error(console.log)
      .done(() => callback({
        title: that.data[0].showName,
        description: that.data[0].showName,
        items: that.data.map(x => {
          let dateToParse = x.dateString.substring(x.dateString.lastIndexOf(': ') + 2)
          let date = new Date(dateToParse);
          let fileName =
            x.fileNameString.substring(
              x.fileNameString.indexOf(': ') + 2,
              x.fileNameString.indexOf('\n')
            )
          if (isNaN(date.getTime())){
            date = new Date(0)
          }

          return {
            title: fileName,
            description: x.showName,
            url: x.url,
            date: date
          }
        })
      }));
  }
}

module.exports = EztvScraper;