/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import { connect } from 'react-redux';
import LeftPanelToggler from '../../components/LeftPanelToggler';
import {RightPanelSmallControl} from '../../components/RightPanelToggler';
import IconButton from 'material-ui/IconButton';
import { toggleNavigation } from '../../actions/panels';

const SteamSignIn = () => (<a href="/auth/steam">
  <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"></img>
  </a>)

function Navigation(props) {
  const {panels, toggleNavigation} = props
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
    return s.root;
  }
  return (
    <div className={containerClass()} role="navigation">
      <LeftPanelToggler/>
    <div className={panels.nav ? s.navigationActive : s.navigation} onClick={toggleNavigation}>
      <Link className={s.link} activeClass={s.linkActive} to="/">Strona główna</Link>
      <Link className={s.link} activeClass={s.linkActive} to="/ranking">Ranking graczy</Link>
      <Link className={s.link} activeClass={s.linkActive} to="/teamspeak">Teamspeak</Link>
      <Link className={s.link} activeClass={s.linkActive} to="/prodota">PRODOTA</Link>
      <a className={s.link} href="https://twitch.tv/dota2pl" target="_blank">Stream</a>
      <a className={s.link} href="http://forum.dota2.pl">Forum</a>
    </div>
      <IconButton
        iconClassName="material-icons"
        iconStyle={{color: 'white'}}
        className={s.navToggle}
        onClick={toggleNavigation}>
        menu
      </IconButton>
      <RightPanelSmallControl/>

    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default connect(state => ({panels: state.panels}), {toggleNavigation})(withStyles(s)(Navigation));
