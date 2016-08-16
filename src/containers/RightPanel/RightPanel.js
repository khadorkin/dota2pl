/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Chat from '../../components/Chat/Chat';
import s from './RightPanel.css';
import SIDEBAR_CHATROOM from '../../constants';
const RightPanel = ({status}) => {
  const containerClass = () => {
    if (status) {
      return s.RightContainerActive;
    }
    return s.RightContainer;
  };
  return (
    <div className={containerClass()}>
      <Chat />
    </div>
  );
};
export default connect(state => ({ status: state.chat.SIDEBAR_CHATROOM.active }))(withStyles(s)(RightPanel));

