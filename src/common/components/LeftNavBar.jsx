import React from 'react';
import MiniProfile from './MiniProfile';
import NavList from './NavList';

import { useState } from 'react';
import ToggleButton from 'react-toggle-button'
import styles from './LeftNavBar.module.css';
import { Link } from 'react-router-dom';

const LeftNavBar = (props) => {
  const [mode, setMode] = useState(true)   

  const handleClick = (event) =>{
    event.preventDefault();
    setMode(!mode); 

  }
  

  return(
    <div className={styles.container}>
      <MiniProfile/>
      <NavList/>

      <div className={styles.toggle}>
        <div className={styles.title}>관리자</div> 
        
        <button 
          className={styles.button}     
          onClick={handleClick}     
        >
        {
          mode ? 
          <Link to="/main/admin/project">ON</Link> 
          : <Link to="/main/home">OFF</Link> 
        }
        </button>       

      </div>
    </div>
  );
};

export default LeftNavBar;