import React from 'react';
import styles from './AdminBoardTopNavBar.module.css';
import { NavLink } from 'react-router-dom';

const AdminBoardTopNavBar = (props) => {
    return(
        <ul className={styles.container}> 
            <NavLink to="/main/admin/board/notice"> <li className={styles.button}>공지사항 관리</li></NavLink>
            <NavLink to="/main/admin/board/qna"> <li className={styles.button}>QnA 관리</li></NavLink>            
        </ul>
    );
};

export default AdminBoardTopNavBar;