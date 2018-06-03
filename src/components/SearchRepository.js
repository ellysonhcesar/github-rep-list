import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchRepository extends PureComponent {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { fetchRepository } = this.props;
    fetchRepository();
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
           <a className="navbar-brand" href="">GitHub Repository</a>
          </div>
          <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

SearchRepository.propTypes = {
  fetchRepository: PropTypes.func.isRequired,
};

export default SearchRepository;
