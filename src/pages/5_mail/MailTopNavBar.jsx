import React from 'react';
import styles from './MailTopNavBar.module.css';
import {useHistory } from 'react-router-dom';

const MailTopNavBar = ({id}) => {
    
    const history = useHistory();
    
    const goGetMail =(event)=>{
        event.preventDefault();
        history.push(`/main/mail/send/${id}`);
    }
    const goSendMail =(event)=>{
        event.preventDefault();
        history.push(`/main/mail/post/${id}`);
    }
    const goMailWrite =(event)=>{
        event.preventDefault();
        history.push(`/main/mail/write`);
    }   

    return(
        <ul className={styles.container}> 
            <li className={styles.button} onClick={goGetMail}>받은쪽지</li>
            <li className={styles.button} onClick={goSendMail}>보낸쪽지</li>
            <li className={styles.button} onClick={goMailWrite}>쪽지쓰기</li>
        </ul>
    );
};
export default MailTopNavBar;