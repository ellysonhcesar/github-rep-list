import React from 'react';
import PropTypes from 'prop-types';
import UserRepos from './UserRepos';

const UserInfo = (props) => {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const convertDate = (inputFormat) => {
    let d = new Date(inputFormat)
    return [monthNames[d.getMonth()], d.getFullYear()].join(' ')
  }

  const showSocial = (user) => {
    const followersLink = `https://github.com/${user.login}?tab=followers`
    const followingLink = `https://github.com/${user.login}?tab=following`
    return (
      <p>
        <a href={followersLink}>Followers: {user.followers}</a> / <a href={followingLink}>Following: {user.following}</a>
      </p>
    )
  }

  return (
    <div className="row">
      <div className="col-lg-8">
        <UserRepos
          repos={props.repos}
          pagingButtons={props.pagingButtons}
          updateRepos={props.updateRepos}
        />
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
  repos: PropTypes.array,
  updateRepos: PropTypes.func
};

export default UserInfo;
