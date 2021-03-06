import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItem/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
  const attachedClasses = (new Array(classes.SideDrawer));
  attachedClasses.push(props.open ? classes.Open : classes.Close);
  
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );

};

export default sideDrawer;