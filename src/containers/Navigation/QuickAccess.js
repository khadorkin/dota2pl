import React, {
    Component,
    PropTypes,
} from 'react';

import style from './QuickAccess.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import QuickButton from './QuickButton.js';
import { toggleChannel } from '../../reducers/chat'
class QuickAccess extends Component {
  render() {
    const { chat, toggleChannel } = this.props;
    return (
            <div className={style.root}>
                <QuickButton onClick={e => toggleChannel()} count={24} icon="chat" active={chat} />


            </div>
        );
  }
}

QuickAccess.propTypes = {};
QuickAccess.defaultProps = {};

export default connect(state => ({
  chat: state.chat.SIDEBAR_CHATROOM.active,
}), { toggleChannel } )(withStyles(style)(QuickAccess));
