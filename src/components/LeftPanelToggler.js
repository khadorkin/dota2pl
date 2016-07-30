import React from 'react';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import * as PanelAC from '../actions/panels';

const LeftPanelControl = ({toggleLeftPanel, state}) => (
  <Toggle
    onClick={toggleLeftPanel}

    toggled={state}
  />
)
export default connect(state => ({state: state.panels.left}), PanelAC)(LeftPanelControl)
