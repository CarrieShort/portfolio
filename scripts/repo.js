(function(module) {
  var reposStats = {};

  reposStats.all = [];

  reposStats.requestRepos = function(repo,callback) {
    $.get('github/repos/carrieshort/' +
            repo +
            '/stats/contributors')
    .done(function(data,message,xhr){
      reposStats.all = data;
      var filteredRepos = reposStats.all.map(function(ele){
        var userStats = {};
        userStats.name = ele.author.login;
        userStats.url = ele.author.html_url;
        userStats.commits = ele.total;
        return userStats;
      });
      callback(filteredRepos);
    });

    // console.log('repo fired');
    // $.ajax({
    //   url: 'https://api.github.com/repos/carrieshort/' + repo + '/stats/contributors',
    //   type: 'GET',
    //   headers: {
    //     'Authorization': 'token ' + githubToken
    //   },
    //   success: function(data, message, xhr) {
    //     reposStats.all = data;
    //     var filteredRepos = reposStats.all.map(function(ele){
    //       var userStats = {};
    //       userStats.name = ele.author.login;
    //       userStats.url = ele.author.html_url;
    //       userStats.commits = ele.total;
    //       return userStats;
    //     });
    //     callback(filteredRepos);
    //   }
    // });
  };

  reposStats.with = function(attr) {
    return reposStats.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.reposStats = reposStats;
})(window);
