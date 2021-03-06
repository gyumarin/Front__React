import React from 'react';
import styles from './CommuteCalender.module.css';

import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

moment.locale('en-GB');
Calendar.momentLocalizer(moment);

const CommuteCalender = (props) => {
  const [commute, setCommute] = useState(false);
  const [commuteData, setCommuteData] =useState([]);  
  const [noButton, setnoButton] = useState(true);

  const date = new Date();
  const year = date.getFullYear(); // 년 
  const month = date.getMonth();   // 월 * ++1
  const datee = date.getDate();    // 일자
  
  const hour = date.getHours();    // 시간
  const minute = date.getMinutes();  // 분
  
  const tmp =sessionStorage.getItem('token').slice(0, -1).substr(1);
  
  // //////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    load();
  },[commute])  

  // useEffect(()=>{
  // },[commuteData]) 

  // /////////////////////////////////////////////////////////////////////////
  const load = async()=>{
    const result = await axios.get(`/employee/commute/list`, 
    {headers: {
      'token': tmp
    }});

    if(result.data.result.length!=0){
    setCommute(result.data.result[result.data.result.length-1].c_end == null ? (result.data.result[result.data.result.length-1].c_day == datee ? true : false) : false);

    var test = result.data.result.filter(item =>item.c_year==year&&item.c_month==month+1&&datee==item.c_day)
    if(test.length>=2){
      setnoButton(false);
    }
  // /////////////////////////////////////////////////////////////////////////
    const dataForCalendar = result.data.result.map(data=>{      
      return {
        'title': data.c_end == null ? `출근 ${data.c_start}`: `퇴근 ${data.c_end}`,
        'allDay': true,
        'start': new Date(data.c_year, data.c_month-1, data.c_day),
        'end': new Date(data.c_year, data.c_month-1, data.c_day),
      };
    });
    setCommuteData(dataForCalendar);
    }
  }
 
  // 출퇴근 버튼 /////////////////////////////////////////////////////////////////////////
  const onCommute = async (event)=>{
    event.preventDefault();
    const commuteCheck = commute ? window.confirm("퇴근하시겠습니까?") : window.confirm("출근하시겠습니까?");

    if(commuteCheck){
        if(commute){      
        await axios.post("/employee/end",{
          "token":sessionStorage.getItem('token').slice(0, -1).substr(1)
        });
        let f=false;
        setCommute(f);      
      }else{
        await axios.post("/employee/start",{
          "token":sessionStorage.getItem('token').slice(0, -1).substr(1)
        });
        let f=true;
        setCommute(f);
      }
    }
    else{return;}
  }  
// ///////////////////////////////////////////////////////////////////////////////////////
  return(
    <div className={styles.container}>
     <div className={styles.calendar} style={{ height: 480 }} >
        {noButton?
        (<button className={styles.button}onClick={onCommute}>{commute?'퇴근':'출근'}</button>)
        :
        <div className={styles.button1}></div>}
        <Calendar 
          className={styles.cal}
          events={commuteData}
          step={60}
          view='month'
          views={['month']}
          popup={true}
          defaultDate={new Date(year, month, datee)}
          onView
        />
      </div>
    </div>
  );
};

export default CommuteCalender;