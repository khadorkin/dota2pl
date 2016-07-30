import { combineReducers } from 'redux';
import runtime from './runtime';
import panels from './panels';
import auth from './auth';
import chat from './chat';
export default combineReducers({
  panels,
  auth,
  chat
});
