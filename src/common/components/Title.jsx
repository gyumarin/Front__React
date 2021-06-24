import React from 'react';
import styles from './Title.module.css';
import {Link} from 'react-router-dom';

const Title = (props) => {
  return(
      <Link to="/home">
        <img src="./images/douzone_logo.png" alt="DOUZONE LOGO" className={styles.logo}/>
      </Link>     
  );
};
export default Title;