(function(module) {
  var scrollController = {};

  scrollController.subpages = function(ctx,next) {
    $target = $('section[data-content="' + ctx.params.content + '"]');
    $('html, body').animate({
      scrollTop: $target.offset().top - 50
    }, 500);
  };
  scrollController.home = function(ctx,next) {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  };

  module.scrollController = scrollController;
})(window);
