import React from 'react';
import burguerLogo from '../../assets/images/burguer-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burguerLogo} alt="burguer-logo" />
  </div>
);

export default logo;