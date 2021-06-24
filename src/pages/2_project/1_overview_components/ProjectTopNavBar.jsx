import React from 'react';
import styles from './ProjectTopNavBar.module.css';
import {NavLink } from 'react-router-dom';

const ProjectTopNavBar = (props) => {
    return(
        <ul className={styles.container}> 
            <NavLink to="/main/project/overview"> <li className={styles.button}>현황</li></NavLink>
            <NavLink to="/main/project/calendar"> <li className={styles.button}>캘린더</li></NavLink>
            <NavLink to="/main/project/workList"> <li className={styles.button}>업무</li></NavLink>
            <NavLink to="/main/project/teamList"> <li className={styles.button}>인원</li></NavLink>
            <NavLink to="/main/project/commitList"> <li className={styles.button}>커밋</li></NavLink>
        </ul>
    );
};

export default ProjectTopNavBar;


