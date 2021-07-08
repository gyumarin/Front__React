import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Title.module.css';
import logo from '../../images/douzone_logo.png';
import axios  from 'axios';
import { useState } from 'react';


const Title = (props) => {
  const history = useHistory();
  let admin =false;

  // console.log(sessionStorage.getItem('isAdmin'));

  const goHome =(event)=>{
    event.preventDefault();
    if(sessionStorage.getItem('isAdmin') == "true"){
      history.push("/main/admin/project");
    }
    else{
      history.push("/main/home");   
    }      
  }

  return(
        <img src={logo} alt="DOUZONE LOGO" className={styles.logo} onClick={goHome}></img>
  );
};
export default Title;