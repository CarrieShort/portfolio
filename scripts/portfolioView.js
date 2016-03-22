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
      var $clickedItem = $(this).data('project');
      var matchedProject = PortfolioItem.all.filter(function(portfolioItem){
        return portfolioItem.project === $clickedItem;
      });
      // .show() is necessary for css animation to work without a delay. The element needs to render before a css animation can be applied. Show forces the render.
      $('.project-details').insertAfter($(this)).show();
      $('.project-details').html(matchedProject[0].compileToHtml('#detail-template'));
      $('.project-details').addClass('expanded');
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
    portfolioView.detailHandler();
    portfolioView.closeHandler();
    portfolioView.toggleMobileMenu();
    portfolioView.funFacts();
    $(window).scroll(stickyHeader);
  });
  module.portfolioView = portfolioView;
})(window);
