var projects = [];

// Constructor function for portfolio item
function PortfolioItem (opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
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

$('#portfolio').on('click','.project-preview',function(){
  var $clickedItem = $(this).data('project');
  var $animatedPreview = $(this).clone();
  $animatedPreview.addClass('selected');
  $(this).after($animatedPreview);
  $('.selected').addClass('move');
  projects.forEach(function(a){
    console.log(a.project);
    if(a.project === $clickedItem){
      console.log('match found');

      a.updateDetailModal();
    }
  });
});


$('header nav').on('click','li',function(e){
  e.preventDefault();
  var $scrollTo = $(this).data('link');
  $target = $('section[data-content="' + $scrollTo + '"]');
  console.log($target);
  $('html, body').animate({
    scrollTop: $target.offset().top - 50
  }, 500);
});

var $headerPosition = $('header').offset().top;

var stickyHeader = function() {
  console.log ($headerPosition);
  console.log('scroll detected');
  console.log($(this).scrollTop());
  if($(this).scrollTop() > $headerPosition){
    console.log('greater');
    $('header').addClass('sticky');
  } else {
    console.log('less');
    $('header').removeClass('sticky');
  }
};
$(window).scroll(stickyHeader);

$('.mobile-menu').on('click',function(e){
  e.preventDefault();
  $('nav ul').slideToggle();
});
