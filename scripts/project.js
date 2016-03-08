var projects = [];

// Constructor function for portfolio item
function PortfolioItem (opts) {
  this.title = opts.title;
  this.previewImage = opts.previewImage;
  this.shortDesc = opts.shortDesc;
  this.publishedOn = opts.publishedOn;
  this.detailedLink = opts.detailedLink;
  this.description = opts. description;
}

PortfolioItem.prototype.buildThumbnails = function() {
  var $newPreview = $('article.template').clone();
  $newPreview.attr('data-project', this.project);
  $newPreview.find('h3').html(this.title);
  $newPreview.find('p').html(this.shortDesc);
  $newPreview.removeClass('template');
  $newPreview.css('background-image','url(img/projects/' + this.previewImage + ')');
  return $newPreview;
};

projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  projects.push(new PortfolioItem(ele));
  console.log('push occured',new PortfolioItem(ele));
});


projects.forEach(function(a){
  console.log('render happened', a);
  $('#portfolio').append(a.buildThumbnails());
});
