import React from 'react';
import styles from './MyPageTopNavBar.module.css'; 
import {NavLink,useHistory } from 'react-router-dom';

const MyPageTopNavBar = (props) => {

    const history = useHistory();
    
    const goCommute =(event)=>{
        event.preventDefault();
        history.push("/main/myPage/commute");
    }
    const goProfile =(event)=>{
        event.preventDefault();
        history.push("/main/myPage/profile");
    }
   

    return(
        <ul className={styles.container}> 
            <li onClick ={goCommute} className={styles.button}>출근부</li>
            <li onClick ={goProfile} className={styles.button}>프로필</li>
        </ul>
    );
};

export default MyPageTopNavBar;