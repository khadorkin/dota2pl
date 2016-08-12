import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import Message from './Message';
import cx from 'classnames';
// import { Scrollbar } from 'react-custom-scrollbars';
import perfectScrollbarCss from '!!isomorphic-style!css?modules=false!postcss-loader?pack=sass!sass-loader!./PerfectScrollbarStyle.scss';

import { Scrollbars } from 'react-custom-scrollbars';

class ChatMessages extends React.Component {
  //
  componentWillUpdate() {
    const node = this.refs.scrollbars;
    this.shouldScrollBottom = node.getClientHeight() + node.getScrollTop() === node.getScrollHeight();
    console.log(node.getClientHeight(), node.getScrollHeight(), node.getScrollTop());
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      const node = this.refs.scrollbars;
      node.scrollToBottom();
    }
  }

  render() {
    const { messages } = this.props;

    return (
      <Scrollbars
        ref="scrollbars"
        autoHide
        renderThumbVertical={props => <div {...props} className={s.scrollbar} style={{ background: '#cc3432' }} />}
        className={cx(s.ChatMessagesWrapper)}
      >
        <div className={s.ChatMessages} >{messages.map((m) => {
          const { time, ...rest } = m;
          return (<Message key={time} time={time} {...rest} />);
        })}</div>

      </Scrollbars>
    );
  }
}


export default withStyles(s, perfectScrollbarCss)(ChatMessages);
