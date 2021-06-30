import React from 'react';
import styles from './MyPageCommuteCalendar.module.css';
import MyCommuteCalendar from './MyCommuteCalendar';

const MyPageCommuteCalendar = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.title}>출근부</div>
            <div className={styles.calendarContainer}>                
                <MyCommuteCalendar/>
            </div>
        </div>
    );
};

export default MyPageCommuteCalendar;