import React from 'react';
import styles from './MailTopNavBar.module.css';
import {NavLink } from 'react-router-dom';

const MailTopNavBar = (props) => {
    return(
        <ul className={styles.container}> 
            <NavLink to="/main/mail/send/1005"> <li className={styles.button}>받은쪽지</li></NavLink>            
            <NavLink to="/main/mail/post/1005"> <li className={styles.button}>보낸쪽지</li></NavLink>   
            <NavLink to="/main/mail/write"> <li className={styles.button}>쪽지쓰기</li></NavLink>                     
        </ul>
    );
};
export default MailTopNavBar;