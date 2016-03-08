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

  return $newPreview;
};
