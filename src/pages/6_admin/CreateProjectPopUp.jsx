import React from "react";
import styles from "./CreateProjectPopUp.module.css";
import { useRef } from "react";
import axios from "axios";

const CreateProjectPopUp = props => {
    const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);

    const nameRef = useRef("");
    const startRef = useRef("");
    const endRef = useRef("");
    const gitRepoRef = useRef("");

    const handleClick = event => {
        event.preventDefault();
        props.setPopup(false);
    };

    const createProject = event => {
        insertProject(event);
    };

    const insertProject = async event => {
        const result = await axios.post("/project/insert", {
            p_title: nameRef.current.value,
            p_date_start: startRef.current.value,
            p_date_end: endRef.current.value,
            p_giturl : gitRepoRef.current.value,
            token: tmp,
        });

        const project = {
            p_id: result.data.result,
            p_title: nameRef.current.value,
            p_date_start: startRef.current.value,
            p_date_end: endRef.current.value,
            p_giturl : gitRepoRef.current.value,
            p_complete:false,
        };
        // console.log(project);
        props.createProject(project);
        props.setPopup(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>프로젝트 생성</h1>
                <button onClick={handleClick} className={styles.exit}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form action="get">
                <label className={styles.label} htmlFor="input">
                    프로젝트명
                </label>
                <input
                    ref={nameRef}
                    className={styles.input}
                    type="text"
                    id="input"
                    placeholder="Project Title"
                    autoFocus
                />

                <label className={styles.label} htmlFor="gitRepo">깃 저장소 명</label>
                <input 
                    ref ={gitRepoRef}
                    className={styles.input} 
                    type="text" 
                    id="gitRepo" 
                    placeholder="Git Repository"
                />

                <label className={styles.label} htmlFor="input">
                    프로젝트 일정
                </label>
                <div>
                    <input
                        ref={startRef}
                        className={styles.date}
                        type="date"
                        id="input"
                        placeholder="시작일"
                        autoFocus
                    />
                    <input
                        ref={endRef}
                        className={styles.date}
                        type="date"
                        id="input"
                        placeholder="마감일"
                        autoFocus
                    />
                </div>

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

export default CreateProjectPopUp;
