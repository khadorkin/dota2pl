// @flow

import React, {
  Component,
  PropTypes,
} from 'react';

import style from './QuickAccess.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import QuickButton from './QuickButton.js';
import {SIDEBAR_CHATROOM} from '../../constants';
import { toggleChannel, unreadMessagesSelector } from '../../reducers/chat';
import { toggleUserPanel } from '../../reducers/userProfile';
import UserPanelWidget from 'containers/UserPanelWidget';
import { toggleNav } from 'reducers/panels';

class QuickAccess extends Component {
  render() {
    const {
      chat,
      count,
      nav,
      userProfileWidgetStatus,
      toggleChannel,
      toggleNav,
      toggleUserPanel
    } = this.props;
    return (
      <div className={style.root}>
        <QuickButton onClick={() => toggleChannel()} count={count} icon="chat" active={chat} />
        <QuickButton onClick={() => toggleUserPanel()} count={0} icon="person" active={userProfileWidgetStatus} />
        <QuickButton onClick={() => toggleNav()} count={0} icon="menu" active={nav} />

      </div>
    );
  }
}

QuickAccess.propTypes = {
  chat: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  toggleChannel: PropTypes.func.isRequired,
};
QuickAccess.defaultProps = {};

export default connect(state => ({
  chat: state.chat[SIDEBAR_CHATROOM].active,
  userProfileWidgetStatus: state.userProfile.active,
  nav: state.panels.nav,
  count: unreadMessagesSelector(state, SIDEBAR_CHATROOM),
}), { toggleChannel, toggleUserPanel, toggleNav })(withStyles(style)(QuickAccess));
