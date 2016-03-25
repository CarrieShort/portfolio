(function(module){
  var pageController = {};

  pageController.initPortfolio = function(){
    PortfolioItem.fetchAll();
    portfolioView.detailHandler();
    portfolioView.toggleMobileMenu();
    portfolioView.funFacts();
    $(window).scroll(portfolioView.stickyHeader);
  };
  pageController.initPortfolio();

  module.pageController = pageController;
})(window);
