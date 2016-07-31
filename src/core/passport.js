/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import passportSteam from 'passport-steam';
import { auth as config, port, host } from '../config';
import * as Models from '../data/models'


const options = {
  returnURL: config.steam.returnURL,
  realm: config.steam.realm,
  apiKey: config.steam.apiKey
};

const SteamStrategy = passportSteam.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new SteamStrategy(options,
  async (identifier, profile, done) => {
      // asynchronous verification, for effect...
      console.log(`[Login/Register] Request hit back from steam, awaiting database response...`);
      let user = await Models.User.findOne({steamId: profile.id});
      console.log(`[Login/Register] User returned from the database..`);
      if(!user) {
        console.log(`[Login/Register] Didn't find user, trying to create`);
        try {
          user = await Models.User.create({
            steamId: profile.id,
            userName: profile.displayName,
            country: profile._json.loccountrycode,
            avatarUrl: {
              small: profile._json.avatar,
              medium: profile._json.avatarmedium,
              big: profile._json.avatarfull
            }})
        } catch (e) {
          console.log(`Error: `, e)
        }
      }
      console.log(`[Login/Register] Fetched user from the database: `,user.userName);
      profile.identifier = identifier;
      return done(null, user);
  }
));


export default passport;
