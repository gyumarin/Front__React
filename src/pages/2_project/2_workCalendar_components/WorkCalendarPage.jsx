import React from 'react';
import styles from './WorkCalendarPage.module.css';
import Calendar from './Calendar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WorkCalendarPage = ({projectID}) => {
  const [isTeam, setIsTeam] = useState(false);
  const [projectInfo, setProjectInfo] = useState("");

  const onMyCalendar = (event)=>{
    event.preventDefault();
    setIsTeam(false);
  } 

  const onTeamCalendar = (event)=>{
    event.preventDefault();
    setIsTeam(true);
  }
  
  useEffect(() => {
    axios.get(`/project/detail/${projectID}`).then(res =>{
        setProjectInfo(res.data.result)        
    });   
}, [])

  return(
    <div className={styles.container}>
      <h3 className={styles.title}>{projectInfo.p_title}<font style={{marginLeft : '10px' ,fontSize:'18px', color : 'rgba(1, 1, 1, 0.3)'}}>업무 캘린더</font></h3>

      <div className={styles.calendar}>
        <Calendar
          isTeam = {isTeam}
          projectID = {projectID}
        />
        <div className={styles.buttons}>
          <button onClick={onTeamCalendar} className={styles.button1}>TEAM</button>
          <button onClick={onMyCalendar} className={styles.button2}>MY</button>
      </div>
      </div>
      
    </div>
  );  
};

export default WorkCalendarPage;