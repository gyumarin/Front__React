import React from 'react';
import styles from './MyCommuteCalendar.module.css';

import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

moment.locale('en-GB');
Calendar.momentLocalizer(moment);  

const MyCommuteCalendar = (props) =>{

  const [commute, setCommute] = useState(false);
  const [commuteData, setCommuteData] =useState([]);  

  const date = new Date();
  const year = date.getFullYear(); // 년 
  const month = date.getMonth();   // 월 * ++1
  const datee = date.getDate();    // 일자  
  const hour = date.getHours();    // 시간
  const minute = date.getMinutes();  // 분    


   useEffect(async ()=>{
    console.log(commute);
    await axios.get("/employee/commute/list?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs")
    .then(res => {
      console.log(res.data.result);
      const dataForCalendar = res.data.result.map(data=>{
        return {
          'title': data.c_end == null ? `출근 ${data.c_start}`: `퇴근 ${data.c_end}`,
          'allDay': true,
          'start': new Date(data.c_year, data.c_month-1, data.c_day),
          'end': new Date(data.c_year, data.c_month-1, data.c_day),
        };
      });
      return dataForCalendar;
    })
    .then(
      data => {
        setCommuteData(data);
      }
    );
  },[commute])


  // 출퇴근 버튼
  const onCommute =(event)=>{
    event.preventDefault();
    const commuteCheck = commute ? window.confirm("퇴근하시겠습니까?") : window.confirm("출근하시겠습니까?");

    if(commuteCheck){
      if(commute){      
      axios.post("/employee/end",{
        "token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs"
      });
      setCommute(!commute);
      
    }else{
      axios.post("/employee/start",{
        "token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs"
      });
      setCommute(!commute);
    }
    }
    else{return;}
  }

  return(
    <div className={styles.container}>
        <div className={styles.calendar} style={{ height: 730 }} >
            <button 
                className={styles.button}
                onClick={onCommute}
              >{commute?'퇴근':'출근'}
            </button>
            <Calendar className={styles.cal}
              events={commuteData}
              step={60}
              view='month'
              views={['month']}
              popup={true}
              defaultDate={new Date(year, month, datee)}
            />
        </div>
    </div>
    );
};

export default MyCommuteCalendar;