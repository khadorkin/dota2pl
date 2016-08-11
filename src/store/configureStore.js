import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';
import createSagaMiddleware, { END } from 'redux-saga'
import rootSaga from '../sagas/sagas'
import ApolloClient from 'apollo-client';


export default function configureStore(initialState, helpersConfig) {
    const client = new ApolloClient();

  const helpers = createHelpers(helpersConfig);
    const middleware = [thunk.withExtraArgument(client), client.middleware()];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,

    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0


    const store = createStore(rootReducer, initialState, enhancer);
  store.runSaga = sagaMiddleware.run
  // store.runSaga(rootSaga);
  store.close = () => store.dispatch(END)
    store.apolloClient = client;

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    );
  }

  return store;
}
