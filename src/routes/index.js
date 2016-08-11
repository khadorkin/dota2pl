/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import contact from './contact';
import ranking from './ranking';
import register from './register';
import content from './content';
import error from './error';
import newsfeed from './newsfeed';
import prodota from './prodota';

export default {

  path: '/',

  children: [
    prodota,
    ranking,
      newsfeed,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
      // console.log(next,render,context, component);

    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
