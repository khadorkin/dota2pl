/**
 * Created by micha on 18.07.2016.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logo.css';
import logo from './logo.png'

const Brand = () => (<div className={s.Container}>
  <div className={s.ImageContainer}>
    <img className={s.Image} src={logo}/>
  </div>
  <div className={s.Caption}>
    <h1 className={s.Heading}>DOTA2.PL</h1>
    <p className={s.Subtitle}>Portal polskiej społeczności</p>
  </div>
</div>);

export default withStyles(s)(Brand);