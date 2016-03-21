(function(module){
  var portfolioView = {};
  var $headerPosition = $('header').offset().top;

  // helper functions
  // toggle sticky header class based on scroll position
  function stickyHeader(){
    if($(this).scrollTop() > $headerPosition){
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
  };

  // on click build detailed view of project
  portfolioView.detailHandler = function (){
    $('#portfolio').on('click','.project-preview',function(){
      $('.project-details').insertAfter($(this));
      var $clickedItem = $(this).data('project');
      PortfolioItem.all.forEach(function(a){
        if(a.project === $clickedItem){
          $('.project-details').html(a.compileToHtml('#detail-template'));
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
      $('#portfolio').append(a.compileToHtml('#preview-template'));
    });
  };

  portfolioView.funFacts = function(){
    var palindromes = $('section p').text().split(' ').reduce(function(a,b){
      if(b === b.split('').reverse().join('')) a.push(b);
      return a;
    },[]);
    var palindromeCount = palindromes.length+1;
    var uniquePalindromes = palindromes.reduce(function(a,b){
      if(jQuery.inArray(b, a) === -1){
        a.push(b);
      }
      return a;
    },[]);

    $('footer').append('<p>There are ' + palindromeCount + ' palindromes on this page. They are : ' + uniquePalindromes.join(', '));
  };

  $(document).ready(function(){
    PortfolioItem.fetchAll();
    portfolioView.navHandler();
    portfolioView.detailHandler();
    portfolioView.closeHandler();
    portfolioView.toggleMobileMenu();
    portfolioView.funFacts();
    $(window).scroll(stickyHeader);
  });
  module.portfolioView = portfolioView;
})(window);
