/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

/* HOCS */
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Navigation.css';
import Link from '../Link';
import { toggleNavigation } from '../../actions/panels';
import QuickAccess from './QuickAccess';

function Navigation(props) {
  const { panels, toggleNavigation } = props;
  const containerClass = () => {
    // if (panels.left && panels.right) {
    //   return s.pullBoth;
    // }
    // if (panels.left) {
    //   return s.pullLeft;
    // }
    // if (panels.right) {
    //   return s.pullRight;
    // }
    return s.root;
  };
  return (
    <div className={containerClass()} role="navigation">
        <div className={s.navigationItems}>
            <div className={panels.nav ? s.navigationActive : s.navigation} onClick={toggleNavigation}>
                <Link className={s.link} activeClass={s.linkActive} to="/">dota2pl</Link>
                <Link className={s.link} activeClass={s.linkActive} to="/ranking">Ranking</Link>
                <Link className={s.link} activeClass={s.linkActive} to="/prodota">proDotaas</Link>
                <a className={s.link} href="http://forum.dota2.pl">Forum</a>
            </div>
            <QuickAccess/>
        </div>

    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default connect(state => ({ panels: state.panels }), { toggleNavigation })(withStyles(s)(Navigation));
