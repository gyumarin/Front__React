import React from 'react';
import styles from './MyPageTopNavBar.module.css'; 
import {NavLink } from 'react-router-dom';

const MyPageTopNavBar = (props) => {
    return(
        <ul className={styles.container}> 
            <NavLink to="/main/myPage/commute"> <li className={styles.button}>출근부</li></NavLink>
            <NavLink to="/main/myPage/profile"> <li className={styles.button}>프로필</li></NavLink>            
        </ul>
    );
};

export default MyPageTopNavBar;