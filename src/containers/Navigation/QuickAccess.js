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
class QuickAccess extends Component {
  render() {
    const { chat, count, toggleChannel,xd } = this.props;
    return (
      <div className={style.root}>
        <QuickButton onClick={() => toggleChannel()} count={count} icon="chat" active={chat} />
        <QuickButton onClick={() => toggleChannel()} count={0} icon="account_circle" active={false} />



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
  count: unreadMessagesSelector(state, SIDEBAR_CHATROOM),
}), { toggleChannel })(withStyles(style)(QuickAccess));
