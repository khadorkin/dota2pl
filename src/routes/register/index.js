/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Register from './Register';
import requiresAuth from '../../components/hoc/Authenticated';


export default {

  path: '/register',

  action() {
    const MWC = requiresAuth(Register);
    return <MWC />;
  },

};
