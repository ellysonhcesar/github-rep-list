var axios = require('axios');

var GitHubUser = {
  getByUsername: function (username) {
    return axios.get('https://api.github.com/users/' + username);
  },

  getReposByUsername: function (username, page = 1) {
    return axios.get(`https://api.github.com/users/${username}/repos?page=${page}&sort=updated`);
  },

  getReposByLink: function (pageLink) {
    return axios.get(pageLink);
  },

  getRepositories: function (language) {
    return axios.get(`https://api.github.com/search/repositories?q=+language:${language}&sort=stars&order=desc&page=1&per_page=5`);
  },

};
//https://api.github.com/search/repositories?q=+language:java&sort=stars&order=desc
module.exports = GitHubUser;