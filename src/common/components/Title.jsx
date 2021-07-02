import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Title.module.css';

const Title = (props) => {
  const history = useHistory();  

  const goHome =(event)=>{
    event.preventDefault();
    history.push("/main/home");
  }

  return(
        <img src="../images/douzone_logo.png" alt="DOUZONE LOGO" className={styles.logo} onClick={goHome}></img>
  );
};
export default Title;