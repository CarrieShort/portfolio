var projects = [];

// Constructor function for portfolio item
function PortfolioItem (opts) {
  this.title = opts.title;
  this.previewImage = opts.previewImage;
  this.project = opts.project;
  this.shortDesc = opts.shortDesc;
  this.publishedOn = opts.publishedOn;
  this.detailedLink = opts.detailedLink;
  this.description = opts. description;
}

PortfolioItem.prototype.buildThumbnails = function() {
  var $newPreview = $('article.template').clone();
  $newPreview.data('project', this.project);
  $newPreview.find('h3').html(this.title);
  $newPreview.find('p').html(this.shortDesc);
  $newPreview.removeClass('template');
  $newPreview.css('background-image','url(img/projects/' + this.previewImage + ')');
  return $newPreview;
};

PortfolioItem.prototype.updateDetailModal = function(){
  console.log('updateFunction ran');
  var $projectDetails = $('article.project-details');
  $projectDetails.data('project', this.project);
  $projectDetails.find('h3').html(this.title);
  $projectDetails.find('.description').html(this.description);
  return $projectDetails;
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

$('.project-preview').click(function(){
  var $clickedItem = $(this).data('project');
  projects.forEach(function(a){
    console.log(a.project);
    if(a.project === $clickedItem){
      console.log('match found');
      a.updateDetailModal();
    }
  });
});
