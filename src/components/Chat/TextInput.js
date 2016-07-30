import React from 'react';
import {findDOMNode } from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import {Editor, EditorState} from 'draft-js';
import {connect} from 'react-redux';
import {sendMessage} from '../../reducers/chat';
import {toggleLeftPanel} from '../../actions/panels';
import FlatButton from 'material-ui/FlatButton';
class TextInput extends React.Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  };

  handleSend = (e) => {
    if(e.keyCode == 13) {
      this.send();
      e.stopPropagation();
    }
  }

  send = () => {
    if(this.state.value.length >= 3) {
      this.props.sendMessage(this.state.value);
      this.setState({value: ''});
    }
    findDOMNode(this.refs.textInput).focus();
  }

  render() {
    return <div className={s.BottomChat}>
      <input
        type="text"
        ref="textInput"
        className={s.TextInput}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleSend}
      />

      <FlatButton label="Wyślij"
                  style={{borderRadius: '0px', minHeight: '100%'}}
                  backgroundColor="#e53935"
                  hoverColor="#e53935"
                  rippleColor="#480a09"
                  onClick={this.send}/>


    </div>
  }
}
export default connect(null, {sendMessage, toggleLeftPanel})(withStyles(s)(TextInput))
