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
  shouldUseCustomScroll = false;
  enabled = false;


  shallEnableScrollbar = () => {
    if(window.screen.width >= 960) {
      this.shouldUseCustomScroll = true;
      this.buildScrollbar();
    } else {
      this.shouldUseCustomScroll = false;
      this.destroyScrollbar();
    }
  }

  buildScrollbar = () => {
    if(!this.enabled && this.shouldUseCustomScroll) {
      if(process.env.BROWSER) {
        this.ps.initialize(this.scrollbar, this.options);
        this.enabled = true;
      }
    }
  }
  destroyScrollbar  = () => {
    if(this.enabled) {
      if(process.env.BROWSER) {
        this.ps.destroy(this.scrollbar);
        this.enabled = false;
      }
    }
  }

  componentDidMount() {
    if(!this.ps) this.ps = require('perfect-scrollbar');
    if(!this.scrollbar) this.scrollbar = this.refs.scroll;
    this.shallEnableScrollbar();
    this.buildScrollbar();
  }

  componentWillUnmount() {
    this.destroyScrollbar();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if(this.props.panels !== prevProps.panels) {
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
      <div className={containerClass()} ref="scroll">
        <Header/>
        {children}
      </div>
    );
  }
}

export default connect(state => ({panels: state.panels}), null)(withStyles(s)(MainContent));
