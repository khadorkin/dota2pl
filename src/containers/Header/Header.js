/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Navigation from '../Navigation';
import AppBar from 'material-ui/AppBar';


import * as PanelAC from '../../actions/panels';
import {connect} from 'react-redux';





import LeftPannelToggler from '../../components/LeftPanelToggler'
import RightPanelToggler from '../../components/RightPanelToggler'

import UserProfile from '../../components/UserProfile/UserProfile'
import Brand from '../../components/Logo/Logo';




let FloatingIcon = () => (
  <div className={s.FloatingIcon}>
    <RightPanelToggler/>
  </div>
)

FloatingIcon = withStyles(s)(FloatingIcon);


// Material-UI is currently missing iconStyleLeft property, this is a simple wrapper container, to work this around.
const LeftIcon = ({children}) => (
  <div style={{
  position: 'relative',
  top: '-4px',
  display: 'flex',
  alignItems: 'center'}}>
    {children}
  </div>
)

const Header = ({toggleLeftPanel, toggleRightPanel}) => {
  return (
    <div className={s.Header}>
    {/*<AppBar*/}
      {/*iconStyleLeft={{margin: '0px', display: 'flex', alignItems: 'center'}}*/}
      {/*iconStyleRight={{margin: '0px', display: 'flex', alignItems: 'center'}}*/}
      {/*iconElementLeft={<LeftIcon><LeftPannelToggler/></LeftIcon>}*/}
      {/*iconElementRight={<Navigation />}*/}
      {/*className={s.AppBar}/>*/}
    <div className={s.ControlPanel}>
      <Brand />

      <UserProfile />
    </div>
      {/*<FloatingIcon/>*/}
     </div>

  );
}

export default connect(null, PanelAC)(withStyles(s)(Header));
