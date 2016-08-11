/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Article from '../../components/Article/Article'
import Connector from '../../components/Article/ConnectedArticle';


export default {

    path: '/article/:id',

    async action({params}) {

        const GraphQLConnectedComponent = Connector(params.id, true)(Article);

        return <GraphQLConnectedComponent/>;
    },

};
