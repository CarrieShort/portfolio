// Constructor function for portfolio item
function PortfolioItem (opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
}

PortfolioItem.all=[];

PortfolioItem.prototype.buildThumbnails = function() {
  var source = $('#preview-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

PortfolioItem.prototype.updateDetailModal = function(){
  var source = $('#detail-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

PortfolioItem.loadAll = function(rawData){
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    PortfolioItem.all.push(new PortfolioItem(ele));
  });
};

PortfolioItem.fetchAll = function(){
  $.getJSON('data/projects.json', function(rawData, status, xhr){
    var currentEtag = xhr.getResponseHeader('ETag');
    console.log(localStorage.etag === currentEtag, localStorage.etag, currentEtag);
    if (localStorage.rawData && localStorage.etag === currentEtag ) {
      console.log('local');
      PortfolioItem.loadAll(JSON.parse(localStorage.rawData));
      loadPortfolioPreviews();
    } else {
      console.log('json');
      PortfolioItem.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      localStorage.etag = currentEtag;
      loadPortfolioPreviews();
    }
  });
};
