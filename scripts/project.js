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

projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  projects.push(new PortfolioItem(ele));
});
