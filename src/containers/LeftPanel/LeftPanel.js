/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import StreamFeed from '../../components/StreamFeed/StreamFeed.js'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LeftPanel.css';



const LeftPanel = ({status}) => {
  const containerClass= () => {
    if(status.left) {
      return s.LeftContainerActive;
    }
    return s.LeftContainer;
  }
  return (
    <div className={containerClass()}>
      <StreamFeed/>
    </div>
  );
}
export default connect(state => ({status: state.panels}))(withStyles(s)(LeftPanel));


