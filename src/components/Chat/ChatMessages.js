import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import Message from './Message';
import cx from 'classnames';
// import perfectScrollbarCss from '!!isomorphic-style!css?modules=false!postcss-loader?pack=sass!sass-loader!perfect-scrollbar/src/css/main.scss'
import perfectScrollbarCss from '!!isomorphic-style!css?modules=false!postcss-loader?pack=sass!sass-loader!./PerfectScrollbarStyle.scss'


const Enhancer = Component => class extends React.Component {


  render() {
    console.log(`Hello from wrapped!`);
    return <Component {...this.props}
                      style={{position: 'relative', overflow: 'hidden'}}

    />
  }
}


class ChatMessages extends React.Component{
  componentDidMount() {
    const container = this.refs.chatMessages;

    if(process.env.BROWSER) {
      if(container) {
        const ps = require('perfect-scrollbar');
        ps.initialize(container, {
          handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch', 'selection'],
        });
      }
    }
  }

  componentWillUpdate() {
    const node = this.refs.chatMessages;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }


  componentDidUpdate() {
    if(this.shouldScrollBottom) {
      const node = this.refs.chatMessages;
      node.scrollTop = node.scrollHeight
    }

  }

  render() {
    const {messages} = this.props;

    return (
      <div className={cx(s.ChatMessagesWrapper)} ref="chatMessages" >
        <div className={s.ChatMessages} >{messages.map((m) => {
          const {time, ...rest} = m;
          return (<Message key={time} time={time} {...rest}/>)
        })}</div>

      </div>
    );
  }
}






export default withStyles(s, perfectScrollbarCss)(ChatMessages)
