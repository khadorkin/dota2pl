import React, { createClass } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import s from './CustomScrollbar.css';


class CustomScrollbar extends React.Component {

  render() {
    const props = this.props;
    return (
            <Scrollbars
              className={s.Overflow}
              autoHide
              renderThumbVertical={props => <div {...props} className={s.scrollbar} style={{ background: '#cc3432' }} />}
              {...props}
            />
        );
  }
}

CustomScrollbar.propTypes = {};
CustomScrollbar.defaultProps = {};

export default CustomScrollbar;
