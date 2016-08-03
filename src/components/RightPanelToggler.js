import React from 'react';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import * as PanelAC from '../actions/panels';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Message from 'material-ui/svg-icons/communication/comment';
import IconButton from 'material-ui/IconButton';



const RightPanelControl = ({toggleRightPanel}) => (
  <FloatingActionButton
    onClick={toggleRightPanel}>
    <Message />
  </FloatingActionButton>
)
let RightPanelSmallControl = ({toggleRightPanel, state}) => (
  <IconButton
    iconClassName="material-icons"
    onClick={toggleRightPanel}
    iconStyle={{
      transition: '.2s ease-in-out',
      color: state ? 'rgb(229, 57, 53)' : 'white'}}>
    chat_bubble
  </IconButton>
);
RightPanelSmallControl = connect(state => ({state: state.panels.right}), PanelAC)(RightPanelSmallControl);
export {RightPanelSmallControl};
export default connect(null, PanelAC)(RightPanelControl);
