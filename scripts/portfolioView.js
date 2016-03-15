(function(module){
  var portfolioView = {};
  var $headerPosition = $('header').offset().top;

  // on click build detailed view of project
  portfolioView.detailHandler = function (){
    $('#portfolio').on('click','.project-preview',function(){
      $('.project-details').insertAfter($(this));
      var $clickedItem = $(this).data('project');
      PortfolioItem.all.forEach(function(a){
        if(a.project === $clickedItem){
          $('.project-details').html(a.updateDetailModal());
          setTimeout(function(){
            $('.project-details').addClass('expanded');
          }, 100);
        }
      });
    });
  };

  // on click scroll to matching section
  portfolioView.navHandler = function(){
    $('header').on('click','*[data-link]',function(e){
      e.preventDefault();
      var $scrollTo = $(this).data('link');
      $target = $('section[data-content="' + $scrollTo + '"]');
      $('html, body').animate({
        scrollTop: $target.offset().top - 50
      }, 500);
    });
  };

  // on click close detail view
  portfolioView.closeHandler = function(){
    $('.project-details').on('click','.close',function(e){
      e.preventDefault();
      $('.project-details').removeClass('expanded');
    });
  };

  // toggle mobile menu
  portfolioView.toggleMobileMenu = function(){
    $('.mobile-menu').on('click',function(e){
      e.preventDefault();
      $('nav ul').slideToggle();
    });
  };

  portfolioView.loadPortfolioPreviews = function(){
    PortfolioItem.all.forEach(function(a){
      $('#portfolio').append(a.buildThumbnails());
    });
  };

  // helper functions
  // toggle sticky header class based on scroll position
  function stickyHeader(){
    if($(this).scrollTop() > $headerPosition){
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
  };

  $(document).ready(function(){
    PortfolioItem.fetchAll();
    portfolioView.navHandler();
    portfolioView.detailHandler();
    portfolioView.closeHandler();
    portfolioView.toggleMobileMenu();
    $(window).scroll(stickyHeader);
  });
  module.portfolioView = portfolioView;
})(window);
