/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

const production = process.env.NODE_ENV === 'production';
console.log(production);
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

};

export const dbConnectionOptions = 'mongodb://localhost:27017/exoticDB';

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

  steam: {
    apiKey: production ? 'BF0CA1E805372C5A0F62CC32E28C9CC7' : '9592670902AA7579FF6CF7DCD0D3D69F',
    returnURL: production ? 'http://tspeak.dota2.pl:3000/auth/steam/return' : `http://${host}/auth/steam/return`,
    realm: production ? 'http://tspeak.dota2.pl:3000/' : `http://${host}/`,
  },
  twitch: {
    clientID: production ? '8fgjwskxu45u5o5vjeryggkmcytxxxg' : 'hvep6tlzyg9p0c2mnfdqbnbodzwjl1l',
    clientSecret: production ? '4ff1bl6ulemmj17vnet9lbxkqmtffd8' : '3ha422mn6wffy4flookkbi1leps7u9c',
    callbackURL: production ? 'http://tspeak.dota2.pl:3000/auth/twitch/return' : 'http://localhost:3000/auth/twitch/return',
    scope: 'user_read',

  },
  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};
