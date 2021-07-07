import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Title.module.css';
import logo from '../../images/douzone_logo.png';
const Title = (props) => {
  const history = useHistory();  

  const goHome =(event)=>{
    event.preventDefault();
    history.push("/main/home");
  }

  return(
        <img src={logo} alt="DOUZONE LOGO" className={styles.logo} onClick={goHome}></img>
  );
};
export default Title;