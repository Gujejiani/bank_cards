import React, { Component } from 'react'
import classes from './App.module.css';

import Logo from './assets/img/logo.png'
import Login from './Container/Login/Login'



const app = () => {

  return (
    <div >



      <Login />


      <img className={classes.Logo} alt="bank app" src={Logo} />

    </div>
  );

}
export default app;
