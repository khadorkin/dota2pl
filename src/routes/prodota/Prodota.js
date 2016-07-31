import React, {
  Component,
  PropTypes,
} from 'react';

import s from './Prodota.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Prodota extends Component {
  render() {
    return (
      <div className={s.root}>Liga aktywna już wkrótce, najświeższe informacje o terminie otwarcia znajdziesz na stronie głównej.</div>
    );
  }
}

Prodota.propTypes = {};
Prodota.defaultProps = {};

export default withStyles(s)(Prodota);
