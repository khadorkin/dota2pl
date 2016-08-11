/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserProfile.css'
import {connect} from 'react-redux';
import React from 'react';
import Paper from 'material-ui/Paper'
import logo from './steam-logo.svg';


let SteamSignIn = () => (<a className={s.SteamLogo} href="/auth/steam">
    <img src={logo}></img>
    <div>
        <h1>Zaloguj się za pomocą Steam</h1>
        <p>Ta strona nie jest powiązana z Valve Corp.</p>
    </div>


</a>)


let RegisterLogin = () => (
  <div>
      {/*<div className={s.Slug}>*/}
      {/*<h1 >Dołącz do nas już dziś!</h1>*/}
      {/*</div>*/}
    <SteamSignIn/>
  </div>
)


let UserBox = ({user}) => (<div className={s.WelcomeMessage}>
  <h1 >Witaj {user.userName} </h1>
  <img src={user.avatarUrl}/>
</div>);

SteamSignIn = withStyles(s)(SteamSignIn);
RegisterLogin = withStyles(s)(RegisterLogin);
UserBox = withStyles(s)(UserBox);


class UserProfile extends React.Component {

  render() {
    return (
        <div className={s.Container}>
            {this.props.user.userName ? null : <RegisterLogin/>}
        </div>
    );
  }
}

export default connect(state => ({user: state.auth}))(withStyles(s)(UserProfile));
