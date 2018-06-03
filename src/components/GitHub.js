import React, { PureComponent } from 'react';
import SearchRepository from './SearchRepository';
import Repository from './Repository';
import _ from 'lodash';
import {
  getByUsername,
  getReposByUsername,
  getReposByLink,
  getRepositories
} from './../services/GitHubUser';

class GitHub extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      repos: [],
      error: null,
      pagingButtons: []
    };

    this.repositories = [];


    this.fetchUser = this.fetchUser.bind(this);
    this.updateRepos = this.updateRepos.bind(this);
    this.fetchRepository = this.fetchRepository.bind(this);
  }

  async fetchRepository(){
    const languages = ['Go', 'Java', 'JavaScript', 'PHP', 'Ruby']
    this.repositories = [];
    await languages.forEach(lang => {
        getRepositories(lang).then((repos) => {
          this.repositories.push(repos.data.items);
          const link = repos.headers.link;
          let pagingButtons;

          if (link) {
              pagingButtons = link.split(/, /).map(info => {
                  const [_, link, text] = info.match(/<(http[^>]+)>; rel="(\w+)"/);
                  return {
                      link,
                      text,
                  };
              });
          }

            this.setState({
                error: null,
                user: null,
                repos: repos.data.items,
                pagingButtons
            });

        }).catch((response) => {
            if (response.status === 404) {
                this.setState({ error: 'Nothing found, try again...' });
            } else if (response.status === 403) {
                this.setState({ error: 'Sorry, Github API access rate limit. Try again later.' });
            } else this.setState({ error: '' + response });
        });
    });


  }


  updateRepos(pageLink){
    getReposByLink(pageLink).then((response) => {
      const link = response.headers.link;
      let pagingButtons;

      if (link) {
        pagingButtons = link.split(/, /).map(info => {
          const [_, link, text] = info.match(/<(http[^>]+)>; rel="(\w+)"/);
          return {
            link,
            text,
          };
        });
      }

      this.setState({ repos: response.data, pagingButtons });
    });
  }

    renderPaging(){
        const { updateRepos } = this.props;
        const pagingButtons = !!this.props.pagingButtons
            ? this.props.pagingButtons.slice(2).concat(this.props.pagingButtons.slice(0, 2))
            : [];

        return (
            <ul className="pagination">
                { pagingButtons.map((pagingInfo, i) =>
                    <li key={ i }>
                      <a href={ pagingInfo.link }
                         onClick={ (e) => { e.preventDefault(); updateRepos(pagingInfo.link) } }>
                          { pagingInfo.text }
                      </a>
                    </li>
                )}
            </ul>
        );
    }

  handleRender(){
      return (
          <div>
            <h2>Showing {this.state.reposCount} public repositories</h2>
              {
                  this.state.repos.map(function(repo) {
                      return <Repository key={repo.id} data={repo} />
                  })
              }
              { this.renderPaging() }
          </div>
      );


    if (this.state.error) {
      return <h3>{this.state.error}</h3>
    }

    return null;
  }

  render () {
    return (
      <div className="container">
        <SearchRepository fetchRepository={this.fetchRepository} />
        {this.handleRender()}
      </div>
    );
  }
}

export default GitHub;
