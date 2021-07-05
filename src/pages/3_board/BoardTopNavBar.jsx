import React from 'react';
import styles from './BoardTopNavBar.module.css';
import { NavLink, useHistory } from 'react-router-dom';

const BoardTopNavBar = (props) => {

    const history = useHistory();
    
    const goNotice =(event)=>{
        event.preventDefault();
        history.push(`/main/board/notice`);
    }
    const goQna =(event)=>{
        event.preventDefault();
        history.push(`/main/board/qna`);
    }
    const goCompanyTree =(event)=>{
        event.preventDefault();
        history.push(`/main/board/companyTree`);
    }
   



    return(
        <ul className={styles.container}> 
             <li onClick={goNotice} className={styles.button}>공지사항</li>
             <li onClick={goQna} className={styles.button}>QnA</li>
             <li onClick={goCompanyTree} className={styles.button}>조직도</li>
        </ul>
    );
};  

export default BoardTopNavBar;