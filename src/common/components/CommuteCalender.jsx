import React from 'react';
import styles from './CommuteCalender.module.css';

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const CommuteCalender = (props) => {
  const handlePrev =(event)=>{
    event.preventDefault();    
  };
  const handleNext=(event)=>{
    event.preventDefault();
  };

  return(
    <div className={styles.container}>
      <div id="menu-navi" className={styles.header}>        
        <button type="button" className={styles.button} onClick={handlePrev}>
          <i className="fas fa-chevron-left" ></i> 
        </button>
        <div className={styles.month}>10월</div>
        <button type="button" className={styles.button}  onClick={handleNext}>
        <i className="fas fa-chevron-right" ></i>
        </button>        
      </div>
      <button className={styles.commuteButton}>출근</button>

      <div className={styles.containerCalendar}>
        <Calendar
          height="900px"
          view="month"
          // useDetailPopup
          // useCreationPopup        
          schedules={[
            {
              id: '3',
              calendarId: 'Travel', // calendarId가 바뀌었죠?
              title: '강촌 OT',
              category: 'allday', // 'allday'로 지정합니다
              start: '2021-06-22',
              end: '2021-06-23',
              color: '#ffffff', // 일정 색상을 직접 지정할 수 있어요
              bgColor: '#03bd9e',
              dragBgColor: '#03bd9e',
              borderColor: '#03bd9e',
              isReadOnly:true
            },
            {
              id: '1',
              calendarId: 'Travel', // calendarId가 바뀌었죠?
              title: '강촌 OT',
              category: 'allday', // 'allday'로 지정합니다
              start: '2021-06-10',
              end: '2021-06-15',
              color: '#ffffff', // 일정 색상을 직접 지정할 수 있어요
              bgColor: 'red',
              dragBgColor: 'red',
              borderColor: 'red',
              isReadOnly:true
            },
            
          ]}            
        />
      </div>      
      
    </div>
  );
};

export default CommuteCalender;