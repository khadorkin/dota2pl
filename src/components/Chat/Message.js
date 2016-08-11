import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import {connect} from 'react-redux';
import {compose} from 'redux';
import IconButton from 'material-ui/IconButton';
import { deleteMessageRequest, timeoutUser, banUser } from '../../reducers/chat';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
const MessageTools = ({
  id,
  deleteMessageRequest,
  timeoutUser,
  banUser,
  steamId,
  ...props
}) => {
  "use strict";
  return (<div className={s.MessageTools} {...props}>
    <div className={s.MessageToolsButton}>
      <i className="material-icons">arrow_back</i>
    </div>
    <div className={s.MessageToolsButton} onClick={() => deleteMessageRequest(id)}>
      <i className="material-icons">remove_circle_outline</i><span>Delete</span>
    </div>
    <div className={s.MessageToolsButton} onClick={() => timeoutUser(steamId)}>
      <i className="material-icons">timer</i><span>Timeout (5m)</span>
    </div>
    <div className={s.MessageToolsButton} onClick={() => banUser(steamId)}>
      <i className="material-icons">close</i><span>Ban</span>
    </div>

  </div>)
}


const MessageToolsConnector = compose(
  withStyles(s),
  connect(null, {deleteMessageRequest, timeoutUser, banUser })
);

const ConnectedMessageTools = MessageToolsConnector(MessageTools);


// const Message = ({user, message, admin})  => (<div className={s.Message}>
//   <span className={s.Author}>{user.userName}</span><span className={s.Contents}>{message}</span>
//   {admin ? <MessageTools id={3}/> : null}
// </div>);
class Message extends React.Component {
  state = {
    active: false,

}
  toggleMessage = () => {
    this.setState({active: !this.state.active})
  }


    render() {
    const {userName, steamId, id, message, admin, time} = this.props;
        moment.locale('pl');
        const newTime = moment.unix(time).calendar();
    return (<div className={s.Message} >
        <div className={s.AuthorAndTime}>
            <span className={admin ? s.AuthorClickable : s.Author} onClick={this.toggleMessage}>{userName}</span>
            <em>{newTime}</em>
        </div>


        <ReactMarkdown
            source={message}
            skipHtml={true}
            className={s.Contents}/>
           {admin && this.state.active ? <ConnectedMessageTools id={id} steamId={steamId} onClick={this.toggleMessage}/> : null}
         </div>)
  }
}

// const Message = ({user, message, admin})  => (<div className={s.Message}>
//   <span className={s.Author}>{user.userName}</span><span className={s.Contents}>{message}</span>
//   {admin ? <MessageTools id={3}/> : null}
// </div>);



const hoc = compose(
  withStyles(s),
  connect(state => ({admin: state.auth.isAdmin})));

export default hoc(Message)
