import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';

const Message = ({user, message})  => (<div className={s.Message}>
  <span className={s.Author}>{user.userName}</span><span className={s.Contents}>{message}</span>

</div>);

export default withStyles(s)(Message)
