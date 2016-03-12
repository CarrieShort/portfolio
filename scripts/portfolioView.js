var $headerPosition = $('header').offset().top;

// on click build detailed view of project
function detailHandler(){
  $('#portfolio').on('click','.project-preview',function(){
    $('.project-details').insertAfter($(this));
    var $clickedItem = $(this).data('project');
    projects.forEach(function(a){
      if(a.project === $clickedItem){
        $('.project-details').html(a.updateDetailModal());
        setTimeout(function(){
          $('.project-details').addClass('expanded');
        }, 100);
      }
    });
  });
}

// on click scroll to matching section
function navHandler(){
  $('header').on('click','*[data-link]',function(e){
    e.preventDefault();
    var $scrollTo = $(this).data('link');
    $target = $('section[data-content="' + $scrollTo + '"]');
    $('html, body').animate({
      scrollTop: $target.offset().top - 50
    }, 500);
  });
}

// on click close detail view
function closeHandler(){
  $('.project-details').on('click','.close',function(e){
    e.preventDefault();
    $('.project-details').removeClass('expanded');
  });
};

// toggle sticky header class based on scroll position
function stickyHeader(){
  if($(this).scrollTop() > $headerPosition){
    $('header').addClass('sticky');
  } else {
    $('header').removeClass('sticky');
  }
};

// toggle mobile menu
function toggleMobileMenu(){
  $('.mobile-menu').on('click',function(e){
    e.preventDefault();
    $('nav ul').slideToggle();
  });
}

$(document).ready(function(){
  navHandler();
  detailHandler();
  closeHandler();
  toggleMobileMenu();
  $(window).scroll(stickyHeader);
});
