(function(module) {
  var repoView = {};

  var render = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());
    return template(repo);
  };

  repoView.index = function() {

    $('#repo ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
