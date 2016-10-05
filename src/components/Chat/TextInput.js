import React from 'react';
import { findDOMNode } from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import { Editor, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { sendMessage } from '../../reducers/chat';
import { toggleLeftPanel } from '../../actions/panels';

import { SIDEBAR_CHATROOM } from '../../constants';
class TextInput extends React.Component {
  state = {
    value: '',
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    findDOMNode(this.refs.textInput).focus();
  }


  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSend = (e) => {
    if (e.keyCode == 13) {
      this.send();
      e.stopPropagation();
    }
  }

  send = () => {
    if (this.state.value.length >= 3) {

      // 1 is room id, should be set programatically
      this.props.sendMessage(this.state.value, SIDEBAR_CHATROOM);
      this.setState({ value: '' });
    }
    findDOMNode(this.refs.textInput).focus();
  }

  render() {
    const { auth } = this.props;
    console.log('Auth', auth, this.props);
    return (<div className={s.BottomChat}>
      <input
        type="text"
        ref="textInput"
        className={s.TextInput}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleSend}
      />

      <button
        onClick={this.send}
        className={s.Button}>Wyślij</button>

      { !auth.userId && <div className={s.pleaseLogin}>
        Zaloguj się, aby napisać wiadomość
      </div>}
    </div>);
  }
}
export default connect(state => ({ auth: state.auth }), { sendMessage, toggleLeftPanel })(withStyles(s)(TextInput));
