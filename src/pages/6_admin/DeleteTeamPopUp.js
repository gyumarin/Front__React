import React, { useState } from "react";
import styles from "./CreateProjectPopUp.module.css";

const DeleteTeamPopUp = ({ delSet, setDelSet, title, projectDelete }) => {
    const [pwd, setPwd] = useState("");
    const handleClick = event => {
        event.preventDefault();
        setDelSet(false);
    };

    const onClick = () => {
        setDelSet(false);
        projectDelete(pwd);
    };

    const onChange = e => {
        setPwd(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>프로젝트 삭제</h1>
                <button onClick={handleClick} className={styles.exit}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form action="get">
                <label className={styles.label} htmlFor="input">
                    {title}
                </label>
                <br></br>
                <label className={styles.label} htmlFor="input">
                    비밀번호
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="input"
                    placeholder="비밀번호"
                    value={pwd}
                    onChange={onChange}
                    autoFocus
                />

                <button className={styles.button1} onClick={onClick}>
                    삭제
                </button>
            </form>
        </div>
    );
};

export default DeleteTeamPopUp;
