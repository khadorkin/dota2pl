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
import rootSaga from '../../sagas/sagas';
import Navigation from '../../containers/Navigation/Navigation';
import { ApolloProvider } from 'react-apollo';

import prodotaTheme from './theme.js';


const muiTheme = getMuiTheme(prodotaTheme);

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
    if (process.env.BROWSER) {
      console.log(`Runing sagas from: ${process.env.BROWSER ? 'client' : 'server'}`);
      store.runSaga(rootSaga);
    } else {
      console.log('In Server environment, we\'re not going to run sagas! (component\\App\\App.js)');
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
        <ApolloProvider store={store} client={store.apolloClient}>
        <MuiThemeProvider muiTheme={muiTheme}>


          <div className={s.Main}>
          <MainContent>
            {this.props.children}
          </MainContent>
            <LeftPanel />
            <RightPanel />
            <Navigation />
          </div>


        </MuiThemeProvider>

        </ApolloProvider>
    );
  }

}

export default App;
