/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import BlueBird from 'bluebird';
import http from 'http';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoConnect from 'connect-mongo';

import Html from './components/Html';
import { ErrorPage } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { loginUser, logoutUser } from './reducers/auth';
import { port, auth, dbConnectionOptions } from './config';



global.Promise = BlueBird;
mongoose.Promise = BlueBird;

const app = express();
const server = http.Server(app);



// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// const connection = mongoose.createConnection(dbConnectionOptions);
mongoose.connect(dbConnectionOptions);

// Session configuration
const MongoStore = mongoConnect(session);
const mongoSessionStore = new MongoStore({mongooseConnection: mongoose.connection});

app.use(session({
  secret: auth.jwt.secret,
  store: mongoSessionStore,
  name: 'prodotaSession',
  resave: true,
  saveUninitialized: true
}))
import webSockets from './websockets/socketio';


// Returns whole socket followed by two namespace instances, structure:
// {socket, pubNs, privNs}


const io = webSockets(server, mongoSessionStore);
import redisConnection from './redis/redis';
const redis = redisConnection();
import Chat from './services/Chat/Chat'
const prodotaChat = new Chat({redis, io});







passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());


//
// Authentication
// -----------------------------------------------------------------------------
// app.use(expressJwt({
//   secret: auth.jwt.secret,
//   credentialsRequired: false,
//   getToken: req => req.cookies.id_token,
// }));

app.get('/auth/steam', passport.authenticate('steam'));

function authenticateSteamResponse(req) {
  return new Promise((res, rej) => {
    passport.authenticate('steam', (err, usr) => {
      if (err) {
        rej(err);
      } else {
        res(usr);
      }
    })(req);
  });
}

// app.get('/auth/steam/return', async (req, res) => {
//   try {
//     const user = await authenticateSteamResponse(req);
//
//     // res.json(user);
//     const expiresIn = 60 * 60 * 24 * 180; // 180 days
//     // const token = jwt.sign({userName: user.userName, userId: user.steamId}, auth.jwt.secret, { expiresIn });
//     // res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
//     res.redirect('/');
//   } catch (e) {
//     res.json({ token: false });
//   }
//
// });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.get('/logout', async (req, res) => {
  res.clearCookie('id_token');
  res.redirect('/');
})

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));




//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const data = { title: '', description: '', style: '', script: assets.main.js, children: '' };

    const store = configureStore({}, {
      cookie: req.headers.cookie,
    });

    const user = req.user;
    if(user) {
      store.dispatch(loginUser(user.userName, user.steamId, user.avatarUrl))

    } else {
      store.dispatch(logoutUser());

    }
    // const token = req.cookies.id_token || null;

    // store.dispatch('END');
    // if(token) {
    //   const userData = await jwt.verify(token, auth.jwt.secret);
    //   store.dispatch(loginUser(userData.userName, userData.userId))
    // } else {
    //   store.dispatch(logoutUser());
    // }
    //

    await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      context: {
        store,
        insertCss: (...styles) => {
          styles.forEach(style => css.push(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
        },
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.children = ReactDOM.renderToString(component);
        data.style = css.join('');
        data.state = store.getState();
        return true;
      },
    });
    store.close();
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(statusCode);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const statusCode = err.status || 500;
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPage error={err} />)}
    </Html>
  );
  res.status(statusCode);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */

// Connect to database
// mongoose.connect(dbConnectionOptions , async () => {
  server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
// })

//



// models.sync().catch(err => console.error(err.stack)).then(() => {
//   app.listen(port, () => {
//     console.log(`The server is running at http://localhost:${port}/`);
//   });
// });
/* eslint-enable no-console */
