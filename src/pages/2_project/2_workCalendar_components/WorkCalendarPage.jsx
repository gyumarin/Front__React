import React from 'react';
import styles from './WorkCalendarPage.module.css';
import Calendar from './Calendar';
const WorkCalendarPage = (props) => {

  
  return(
    <div className={styles.container}>
      <div className={styles.calendar}>
        <Calendar/>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button1}>TEAM</button>
        <button className={styles.button2}>MY</button>
      </div>
    </div>
  );  
};

export default WorkCalendarPage;