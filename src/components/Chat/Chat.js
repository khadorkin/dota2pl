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

class Chat extends React.Component {
  render() {
    const { messages } = this.props;
    // const messages = [];
    return (
      <div className={s.Container}>
        <ChatMessages messages={messages} />
        <TextInput />
      </div>
    );
  }
}

export default connect(state => ({ messages: state.chat }))(withStyles(s)(Chat));
