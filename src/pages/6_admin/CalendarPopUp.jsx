import React, { useState } from 'react';
import styles from './CalendarPopUp.module.css';
import { useRef } from 'react';

const CalendarPopUp = (props) => {   

    const startRef = useRef("");
    const endRef = useRef("");

    const handleClick =(event)=>{
        event.preventDefault();
        props.setCpopup(false);
    }

    const createProject =(event) =>{
        event.preventDefault();
        props.editDate(startRef.current.value,endRef.current.value);
        props.setCpopup(false);
    }            

    return(
        <div className ={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>일정 변경</h1>
            <button onClick ={handleClick} className={styles.exit}><i className="fas fa-times"></i></button>
        </div>
        
        <form action="get">            
            
            <label className={styles.label} htmlFor="input">프로젝트 일정</label>
            <div>
                <input ref = {startRef} className={styles.date} type="date" id="input" placeholder="시작일" autoFocus/>
                <input ref = {endRef} className={styles.date} type="date" id="input" placeholder="마감일" autoFocus/>
            </div>
            
            <input className={styles.button1} type="button" value="저장" onClick = {createProject}/>
            <input className={styles.button2} type="reset" value="취소" />
        </form>
    </div>
    );
};

export default CalendarPopUp;