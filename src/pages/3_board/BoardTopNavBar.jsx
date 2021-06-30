import React from 'react';
import styles from './BoardTopNavBar.module.css';
import { NavLink } from 'react-router-dom';

const BoardTopNavBar = (props) => {
    return(
        <ul className={styles.container}> 
            <NavLink to="/main/board/notice"> <li className={styles.button}>공지사항</li></NavLink>
            <NavLink to="/main/board/qna"> <li className={styles.button}>QnA</li></NavLink>            
            <NavLink to="/main/board/companyTree"> <li className={styles.button}>조직도</li></NavLink>            
        </ul>
    );
};  

export default BoardTopNavBar;