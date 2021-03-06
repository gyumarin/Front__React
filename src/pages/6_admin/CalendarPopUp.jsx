import React, { useState } from "react";
import styles from "./CalendarPopUp.module.css";
import { useRef } from "react";
import axios from "axios";

const CalendarPopUp = props => {
    const startRef = useRef("");
    const endRef = useRef("");
    const gitUrlRef = useRef("");

    const handleClick = event => {
        event.preventDefault();
        props.setCpopup(false);
    };

    const createProject = event => {
        event.preventDefault();
        props.editDetail(startRef.current.value, endRef.current.value, gitUrlRef.current.value);
        props.setCpopup(false);
        dateUpdate(startRef.current.value, endRef.current.value, props.p_id, gitUrlRef.current.value);
    };

    const dateUpdate = (start, end, p_id, giturl) => {
        const result = axios.put("/project/date", {
            p_date_start: start,
            p_date_end: end,
            p_id: p_id,
            p_giturl : giturl
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>일정 변경</h1>
                <button onClick={handleClick} className={styles.exit}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form action="get">
                <label className={styles.label} htmlFor="input">
                    프로젝트 일정
                </label>
                <div>
                     <input
                        ref={startRef}
                        className={styles.date}
                        type="text"
                        id="input"
                        placeholder="시작일"
                        autoFocus
                        defaultValue={props.projectDetail.p_date_start}
                        readOnly
                    />
                    <input
                        ref={endRef}
                        className={styles.date1}
                        type="date"
                        id="input"
                        placeholder="마감일"
                        defaultValue={props.projectDetail.p_date_end} 
                        autoFocus
                    />
                </div>

                <label 
                    className={styles.label}
                    htmlFor="gitUrl">
                    깃 저장소 명
                </label>
                <input 
                    ref={gitUrlRef}
                    className={styles.input}
                    type="text" 
                    defaultValue={props.projectDetail.p_giturl} 
                    placeholder="Git Repository" 
                    id ="gitUrl"
                />

                <input
                    className={styles.button1}
                    type="button"
                    value="저장"
                    onClick={createProject}
                />
            </form>
        </div>
    );
};

export default CalendarPopUp;
