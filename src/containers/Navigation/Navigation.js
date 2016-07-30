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

const SteamSignIn = () => (<a href="/auth/steam">
  <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"></img>
  </a>)

function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.link} to="/">Strona główna</Link>
      <Link className={s.link} to="/ranking">Ranking graczy</Link>
      <Link className={s.link} to="/teamspeak">Teamspeak</Link>
      <Link className={s.link} to="/liga">PRODOTA</Link>
      <a className={s.link} href="https://twitch.tv/dota2pl" target="_blank">Stream</a>
      <a className={s.link} href="http://forum.dota2.pl">Forum</a>

    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Navigation);
