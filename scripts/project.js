// Constructor function for portfolio item
(function(module){
  function PortfolioItem (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }

  PortfolioItem.prototype.compileToHtml = function(source){
    var template = Handlebars.compile($(source).html());
    return template(this);
  };

  PortfolioItem.loadAll = function(rawData){
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    PortfolioItem.all = rawData.map(function(ele) {
      return new PortfolioItem(ele);
    });

    PortfolioItem.allPlus = PortfolioItem.all.map(function(item){
      var stats = reposStats.requestRepos(item.github,function(array){
        // console.log('array of data',array, item);
        item.contributors = array;
        console.log('the modded item',item);
      });
      return item;
    });
  };

  PortfolioItem.fetchAll = function(){
    $.getJSON('data/projects.json', function(rawData, status, xhr){
      var currentEtag = xhr.getResponseHeader('ETag');
      if (localStorage.rawData && localStorage.etag === currentEtag ) {
        PortfolioItem.loadAll(JSON.parse(localStorage.rawData));
        portfolioView.loadPortfolioPreviews();
      } else {
        PortfolioItem.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData);
        localStorage.etag = currentEtag;
        portfolioView.loadPortfolioPreviews();
      }
    });
  };

  module.PortfolioItem = PortfolioItem;
})(window);
