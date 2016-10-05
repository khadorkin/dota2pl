/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserProfile.css';
import { connect } from 'react-redux';
import React from 'react';
import logo from './steam-logo.svg';


let SteamSignIn = () => (<a className={s.SteamLogo} href="/auth/steam">
    <img src={logo}></img>
    <div>
        <h1>Zaloguj się za pomocą Steam</h1>
        <p>Ta strona nie jest powiązana z Valve Corp.</p>
    </div>
</a>);



let TwitchWidget = ({user}) => (
  <div className={s.TwitchWidget}>
    { user ? <p>Konto <strong>{user}</strong>@twitch.tv zostało powiązane z naszym serwisem, Twoje transmisje będą listowane na naszej stronie.</p> :  <div>
      <a href="/auth/twitch">
        <img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png" />
      </a>
      <p>Twoje transmisje będą widoczne na naszej stronie!</p>
    </div>}

  </div>
);
TwitchWidget = withStyles(s)(TwitchWidget);

let RegisterLogin = () => (
  <div>
      {/* <div className={s.Slug}>*/}
      {/* <h1 >Dołącz do nas już dziś!</h1>*/}
      {/* </div>*/}
    <SteamSignIn />
  </div>
);

let UserProfileInfo = ({user}) => (
  <div
    className={s.UserProfileInfo}
    style={{backgroundImage: `linear-gradient(to bottom,rgba(19, 21, 26, 1), rgba(19, 21, 26, 0.75)), url(${user.avatarUrl})`}}
  >
    <h5 className={s.UserProfileInfo__header}>
      Witaj <span>{user.userName}</span>!
    </h5>
  </div>
);

let UserBox = ({ user }) => (<div className={s.WelcomeMessage}>
  <h1 >Witaj {user.userName} </h1>
  <img src={user.avatarUrl} />
</div>);

SteamSignIn = withStyles(s)(SteamSignIn);
RegisterLogin = withStyles(s)(RegisterLogin);
UserBox = withStyles(s)(UserBox);
UserProfileInfo = withStyles(s)(UserProfileInfo);

class UserProfile extends React.Component {

  render() {
    return (
        <div className={s.Container}>
            {this.props.user.userName ? <UserProfileInfo user={this.props.user} /> : <RegisterLogin />}
            {this.props.user.userName && <TwitchWidget user={this.props.user.twitchName} />}
        </div>
    );
  }
}

export default connect(state => ({ user: state.auth }))(withStyles(s)(UserProfile));
