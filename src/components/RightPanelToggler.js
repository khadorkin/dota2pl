import React from 'react';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import * as PanelAC from '../actions/panels';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Message from 'material-ui/svg-icons/communication/comment';



const RightPanelControl = ({toggleRightPanel}) => (
  <FloatingActionButton
    onClick={toggleRightPanel}>
    <Message />
  </FloatingActionButton>
)
export default connect(null, PanelAC)(RightPanelControl)
