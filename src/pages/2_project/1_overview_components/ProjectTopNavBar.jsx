import React from 'react';
import styles from './ProjectTopNavBar.module.css';
import {NavLink, useHistory } from 'react-router-dom';

const ProjectTopNavBar = ({projectID}) => {

    const history = useHistory();
    
    const goOverview =(event)=>{
        event.preventDefault();
        history.push(`/main/project/${projectID}`);
    }
    const goCalendar =(event)=>{
        event.preventDefault();
        history.push(`/main/project/${projectID}/calendar`);
    }
    const goWorkList =(event)=>{
        event.preventDefault();
        history.push(`/main/project/${projectID}/workList`);
    }
    const goTeamList =(event)=>{
        event.preventDefault();
        history.push(`/main/project/${projectID}/teamList`);
    }
    const goCommitList =(event)=>{
        event.preventDefault();
        history.push(`/main/project/${projectID}/commitList`);
    }



    return(
        <ul className={styles.container}> 
            <li onClick={goOverview} className={styles.button}>현황</li>
            <li onClick={goCalendar} className={styles.button}>캘린더</li>
            <li onClick={goTeamList} className={styles.button}>인원</li>
            <li onClick={goWorkList} className={styles.button}>업무</li>            
            <li onClick={goCommitList} className={styles.button}>커밋</li>
        </ul>
    );
};


export default ProjectTopNavBar;

