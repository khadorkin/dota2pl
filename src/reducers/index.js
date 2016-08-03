import { combineReducers } from 'redux';
import runtime from './runtime';
import panels from './panels';
import auth from './auth';
import chat from './chat';
import stream from './stream';
export default combineReducers({
  panels,
  auth,
  chat,
  stream
});
