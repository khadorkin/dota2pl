
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StreamFeed.css'
import React from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { findDOMNode } from 'react-dom';
import perfectScrollbarCss from '!!isomorphic-style!css?modules=false!postcss-loader?pack=sass!sass-loader!../Chat/PerfectScrollbarStyle.scss'

let Stream = ({name, title, url, viewers, preview, id}) => {
  return (<div className={s.stream}>
    <img src={preview} className={s.image} alt={id} />
    <div className={s.overlay}>
      <div className={s.name}> {name} </div>
      <div className={s.link}>
        <IconButton
          iconClassName="material-icons"
          iconStyle={{color: 'rgb(229, 57, 53)'}}>
        <a href={url} target="_blank">arrow_forward</a>
      </IconButton></div>
      <div className={s.viewers}> {viewers} </div>

    </div>
  </div>)
}

Stream = withStyles(s)(Stream);

class StreamFeed extends React.Component {
  options = {};
  scrollbar = null;
  ps = null;

  buildScrollbar = () => {
    const container = this.scrollbar;
    if(process.env.BROWSER) {
      if(container) {
        if(!this.ps) this.ps = require('perfect-scrollbar');
        this.ps.initialize(container, this.options);
      }
    }
  }

  destroyScrollbar  = () => {
    const container = this.scrollbar;
    if(process.env.BROWSER) {
      if(container) {
        this.ps.destroy(container);
      }
    }
  }
  updateScrollbar = () => {
    const container = this.scrollbar;
    if(process.env.BROWSER) {
      if(container) {
        this.ps.destroy(container);
      }
    }
  }

  componentDidMount() {
    this.scrollbar = findDOMNode(this.refs.stream);
    this.buildScrollbar();
  }

  componentWillUnmount() {
    this.destroyScrollbar();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {

  }

  render() {
    const {stream} = this.props;

    return (
      <div className={s.Container} ref="stream">
        { stream.length ? stream.map(e => {
          return (<Stream {...e} key={e.id} />);
        }) : <p>If this appeared, I fucked up.</p>}
      </div>
    );
  }
}

export default connect(state => ({stream: state.stream}))(withStyles(s)(StreamFeed));
