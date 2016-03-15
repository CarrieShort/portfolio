var projects = [];

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
    projects.push(new PortfolioItem(ele));
  });
};

PortfolioItem.fetchAll = function(){
  $.getJSON('data/projects.json', function(rawData, status, xhr){
    var currentEtag = xhr.getResponseHeader('ETag');
    var storedEtag = localStorage.getItem('etag');
    console.log(storedEtag === currentEtag, storedEtag, currentEtag);
    if (localStorage.rawData && storedEtag === currentEtag ) {
      console.log('local');
      var retrievedData = localStorage.getItem('rawData');
      var parsedJSON = JSON.parse(retrievedData);
      PortfolioItem.loadAll(parsedJSON);
      loadPortfolioPreviews();
    } else {
      console.log('json');

      storedEtag = xhr.getResponseHeader('ETag');
      PortfolioItem.loadAll(rawData);
      var storedData = JSON.stringify(rawData);
      localStorage.setItem ('rawData',storedData);
      localStorage.setItem('etag',storedEtag);
      loadPortfolioPreviews();

    }
  });
};
