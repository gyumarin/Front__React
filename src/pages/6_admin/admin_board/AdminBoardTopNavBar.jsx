import React, { useState } from 'react';
import styles from './AdminBoardTopNavBar.module.css';
import { NavLink, useHistory } from 'react-router-dom';

const AdminBoardTopNavBar = (props) => {
    const history = useHistory();

    const goCareNotice =(event)=>{
        event.preventDefault();
        history.push("/main/admin/board/notice");
    }
    const goCareQna =(event)=>{
        event.preventDefault();
        history.push("/main/admin/board/qna");
    }

    return(
        <ul className={styles.container}> 
            <li className={styles.button} onClick={goCareNotice}>공지사항 관리</li>
           <li className={styles.button} onClick={goCareQna}>QnA 관리</li>         
        </ul>
    );
};

export default AdminBoardTopNavBar;