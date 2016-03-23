(function(module) {
  var repoController = {};

  repoController.index = function() {
    repos.requestRepos(repoView.index);
  };

  module.repoController = repoController;
})(window);
