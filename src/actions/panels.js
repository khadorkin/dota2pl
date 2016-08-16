/**
 * Created by micha on 11.07.2016.
 */
import {SIDEBAR_CHATROOM, TOGGLE_CHANNEL} from '../constants';


import { TOGGLE_LEFT, TOGGLE_RIGHT, TOGGLE_NAV } from '../constants';
export const toggleLeftPanel = () => { return { type: TOGGLE_LEFT }; };
export const toggleRightPanel = () => { return { type: TOGGLE_RIGHT }; };
export const toggleNavigation = () => { return { type: TOGGLE_NAV }; };

