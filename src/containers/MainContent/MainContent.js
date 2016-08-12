/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Header from '../Header';
import s from './MainContent.css';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class MainContent extends React.Component {

  render() {
    const { panels } = this.props;
    const containerClass = () => {
      if (panels.left && panels.right) {
        return s.pullBoth;
      } else if (panels.left) {
        return s.pullLeft;
      } else if (panels.right) {
        return s.pullRight;
      } else {
        return s.Container;
      }
    };

    const { children } = { ...this.props };

    return (<div className={containerClass()} >
            {children}
            </div >
    );
  }
}

export default connect(state => ({ panels: state.panels }), null)(withStyles(s)(MainContent));
