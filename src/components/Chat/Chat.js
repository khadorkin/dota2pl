/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import React from 'react';
import ChatMessages from './ChatMessages';
import TextInput from './TextInput';
import { connect } from 'react-redux';
import { SIDEBAR_CHATROOM } from '../../constants';

class Chat extends React.Component {
  render() {
    const { channel } = this.props;
    // const { messages } = channel;
    // console.log(`Messages from parent:`, messages)

    return (
      <div className={s.Container}>
        <ChatMessages messages={ channel ? channel.messages : []} />
        <TextInput />
      </div>
    );
  }
}

export default connect(state => ({ channel: state.chat[SIDEBAR_CHATROOM] }))(withStyles(s)(Chat));
