import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserPanelWidget.css';
import { connect } from 'react-redux';
import UserProfile from 'components/UserProfile/UserProfile';

class UserPanelWidget extends React.Component {

  render() {
    const { active, className, ...props } = this.props;
    console.log('active',active, this.props);
    return (
      <div className={className} onClick={e => e.stopPropagation()}>
        {active && <div className={s.container}>
          <UserProfile />
        </div>}
      </div>
    );
  }
}
export default connect(state => ({ active: state.userProfile.active }))(withStyles(s)(UserPanelWidget)); // eslint-disable-line
