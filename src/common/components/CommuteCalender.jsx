import React from 'react';
import styles from './CommuteCalender.module.css';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

moment.locale('en-GB');
Calendar.momentLocalizer(moment);

const CommuteCalender = (props) => {
  let count = 0;

  const date = new Date();
  const year = date.getFullYear(); // 년 
  const month = date.getMonth();   // 월 * ++1
  const datee = date.getDate();    // 일자
  
  const hour = date.getHours();    // 시간
  const minute = date.getMinutes();  // 분
  

  const [commute, setCommute] = useState(false);
  const [commuteData, setCommuteData] =useState([
    {
      'title': '',
      'allDay': true,
      'start': new Date(2000, 5, 1),
      'end': new Date(2000, 5, 1),
    }
  ]);
  
 
  // 출퇴근 버튼
  const onCommute =(event)=>{
    event.preventDefault();
    count++;
    const commuteCheck = commute ? window.confirm("퇴근하시겠습니까?") : window.confirm("출근하시겠습니까?");

    if(commuteCheck){
      setCommute(!commute);
      setCommuteData(
        [...commuteData, 
          {'title' : `${commute?'퇴근':'출근'} ${hour} : ${minute}`, 
          'allDay' : true, 
          'start' : new Date(year, month, datee), 
          'end': new Date(year, month, datee)}
        ])
    }
    else{return;}
  }
  

  return(
    <div className={styles.container}>
     <div className={styles.calendar} style={{ height: 450 }} >
        <button 
          className={styles.button}
          onClick={onCommute}
        >{commute?'퇴근':'출근'}
        </button>
        <Calendar 
          className={styles.cal}
          events={commuteData}
          step={60}
          view='month'
          views={['month']}
          popup={true}
          // Formats={ }
          defaultDate={new Date(year, month, datee)}
        />
      </div>
    </div>
  );
};

export default CommuteCalender;