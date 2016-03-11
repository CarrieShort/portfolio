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


projects.forEach(function(a){
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
    if(a.project === $clickedItem){
      $('.project-details').html(a.updateDetailModal());
      setTimeout(function(){
        $('.project-details').addClass('expanded');
      }, 500);
      // $('.project-details').addClass('expanded');
      // a.updateDetailModal();
    }
  });
});


$('header').on('click','*[data-link]',function(e){
  e.preventDefault();
  var $scrollTo = $(this).data('link');
  $target = $('section[data-content="' + $scrollTo + '"]');
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
  if($(this).scrollTop() > $headerPosition){
    $('header').addClass('sticky');
  } else {
    $('header').removeClass('sticky');
  }
};
$(window).scroll(stickyHeader);

$('.mobile-menu').on('click',function(e){
  e.preventDefault();
  $('nav ul').slideToggle();
});
