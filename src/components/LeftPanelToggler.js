import React from 'react';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import * as PanelAC from '../actions/panels';
import IconButton from 'material-ui/IconButton';


const LeftPanelControl = ({toggleLeftPanel, state}) => (
  <IconButton
    iconClassName="material-icons"
    onClick={toggleLeftPanel}
    iconStyle={{
      transition: '.2s ease-in-out',
      color: state ? 'rgb(229, 57, 53)' : 'white'}}>
    ondemand_video
  </IconButton>
)



export default connect(state => ({state: state.panels.left}), PanelAC)(LeftPanelControl)
