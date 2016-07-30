/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LeftPanel from '../../containers/LeftPanel/LeftPanel.js';
import MainContent from '../../containers/MainContent/MainContent.js';
import RightPanel from '../../containers/RightPanel/RightPanel.js';
import rootSaga from '../../sagas/sagas'
import socket from 'socket.io-client'

import prodotaTheme from './theme.js'

import {green100, green500, green700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme(prodotaTheme);
// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: green500,
//     primary2Color: green700,
//     primary3Color: green100,
//   },
// }, {
//   avatar: {
//     borderColor: null,
//   },
// });

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }).isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {

    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);

    const store = this.props.context.store;
    if(process.env.BROWSER) {
      console.log(`Runing sagas from: ${process.env.BROWSER ? 'client' : 'server'}`);
      store.runSaga(rootSaga);
    } else {
      console.log(`In Server environment, we're not going to run sagas! (component\\App\\App.js)`);
    }


    if(process.env.BROWSER) {
      // console.log(`We're in browser, launching webSocket connections`);
      // const {userName} = store.getState().auth;
      // const port = process.env.NODE_ENV === 'development' ? ':3000' : '';
      // const connectionPath = `${document.location.protocol}//${document.location.hostname}${port}/${userName ? 'authorized' : 'public'}`
      //
      // console.log(connectionPath);
      // const io = socket(connectionPath);
      // io.on('connect', (s) => {
      //   console.log(`Eastblished ${userName ? 'private' : 'public'} wS connection!`);
      //   io.emit('chat:message', 'Czesc z Polski');
      //
      //   io.on('chat:message', (m) => {
      //     console.log(`Recieved message from server: ${m}`)
      //   })
      //   io.on('chat:messages', (m) => {
      //     console.log(`Recieved initial messages from server: ${m}`)
      //   })
      //
      //   io.on('chat:join', (m) => {
      //     console.log(`${m.userName} has joined the channel`);
      //   })
      //
      //   io.on('chat:leave', (m) => {
      //     console.log(`${m.userName} has left the channel`);
      //   })
      //
      //
      // })
    }
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }

    const store = this.props.context.store;


    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>


          <div className={s.Main}>
          <MainContent>
            {this.props.children}
          </MainContent>
            <LeftPanel/>
            <RightPanel/>  
        </div>


        </MuiThemeProvider>

      </Provider>
    );
  }

}

export default App;
