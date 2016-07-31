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
import {connect} from 'react-redux';
import cx from 'classnames'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as PanelAC from '../../actions/panels';

class MainContent extends React.Component {
  options = {handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch', 'selection']};
  scrollbar = null;
  ps = null;

  buildScrollbar = () => {
    const container = this.refs.chatMessages;
    if(process.env.BROWSER) {
      if(container) {
        this.ps = require('perfect-scrollbar');
        this.ps.initialize(container, this.options);
      }
    }
  }

  destroyScrollbar  = () => {
    const container = this.refs.chatMessages;
    if(process.env.BROWSER) {
      if(container) {
        this.ps.destroy(container);
      }
    }
  }
  updateScrollbar = () => {
    const container = this.refs.chatMessages;
    if(process.env.BROWSER) {
      if(container) {
        this.ps.destroy(container);
      }
    }
  }

  componentDidMount() {
    this.buildScrollbar();
  }

  componentWillUnmount() {
    this.destroyScrollbar();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if(this.props.panels !== prevProps.panels) {
      console.log(`Pannels toggled, going to update scrollbar`);
      this.destroyScrollbar();
      this.buildScrollbar();
    }
  }


  render() {

    const {panels} = {...this.props}
    const containerClass= () => {
      if(panels.left && panels.right) {
        return s.pullBoth;
      }
      if(panels.left) {
        return s.pullLeft;
      }
      if(panels.right) {
        return s.pullRight;
      }
      return s.Container;
    }

    const {children} = {...this.props}

    return (
      <div className={containerClass()} ref="chatMessages">
        <Header/>
        {children}
      </div>
    );
  }
}

export default connect(state => ({panels: state.panels}), null)(withStyles(s)(MainContent));
