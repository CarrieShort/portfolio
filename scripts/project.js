var projects = [];

// Constructor function for portfolio item
function PortfolioItem (opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
}

PortfolioItem.prototype.buildThumbnails = function() {
  var source = $('#preview-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

PortfolioItem.prototype.updateDetailModal = function(){
  // console.log('updateFunction ran');
  // var $projectDetails = $('article.project-details');
  // $projectDetails.data('project', this.project);
  // $projectDetails.find('h3').html(this.title);
  // $projectDetails.find('.description').html(this.description);
  // return $projectDetails;
  var source = $('#detail-template').html();
  var template = Handlebars.compile(source);
  return template(this);
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
  $('.project-details').insertAfter($(this));

  var $clickedItem = $(this).data('project');
  // var $animatedPreview = $(this).clone();
  // $animatedPreview.addClass('selected');
  // $(this).after($animatedPreview);
  // $('.selected').addClass('move');

  projects.forEach(function(a){
    console.log(a.project);
    if(a.project === $clickedItem){
      console.log('match found');
      $('.project-details').html(a.updateDetailModal());
      setTimeout(function(){
        $('.project-details').addClass('expanded');
      }, 500);
      // $('.project-details').addClass('expanded');
      // a.updateDetailModal();
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

$('.project-details').on('click','.close',function(e){
  e.preventDefault();
  $('.project-details').removeClass('expanded');
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
