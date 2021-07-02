import React, { useCallback, useRef } from 'react';
import styles from './Calendar.module.css';

import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// const start = new Date();
// const end = new Date(new Date().setMinutes(start.getMinutes() + 30));


const calendars : ICalendarInfo[] = [ 
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff"
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  },
  
];


const Calendar  = (props) => {
    const [schedules,setSchedules] : ISchedule[]  = useState([
      {
        calendarId: "1",
        category: "My Calendar",
        isVisible: true,
        title: "Study",
        id: "1",
        body: "Test",
        start : "2020-06-01",
        end : "2020-06-05"
      },  
    ]);

    useEffect(()=>{
      axios.get("/project/list/calendar?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs")
      .then(res=>{     
        console.log(res.data.result);    
        const datas = res.data.result.map(data=>{
          return {
            calendarId: "2",
            category: "time",
            isVisible: false,
            title: data.p_title,
            id:data.p_id,
            body: `담당자 : ${data.p_manager}`,
            start : data.p_date_start,
            end : "2021-06-23"
          };
        });
        return datas;
      })
      .then(data=>{
        setSchedules(data);
        }
      )
    },[]);


    const [month, setMonth] =useState(new Date().getMonth()+1);
    const [year, setYear] = useState(new Date().getFullYear());
    let count = new Date().getMonth()+1;

    const cal = useRef(null);

    const onClickSchedule = useCallback((e) => {
      const { calendarId, id } = e.schedule;
      const el = cal.current.calendarInst.getElement(id, calendarId);  
    }, []);
  
    // const onBeforeCreateSchedule = useCallback((scheduleData) => {
    //   console.log(scheduleData);
  
    //   const schedule = {
    //     id: String(Math.random()),
    //     title: scheduleData.title,
    //     isAllDay: scheduleData.isAllDay,
    //     start: scheduleData.start,
    //     end: scheduleData.end,
    //     category: scheduleData.isAllDay ? "allday" : "time",
    //     dueDateClass: "",
    //     location: scheduleData.location,
    //     raw: {
    //       class: scheduleData.raw["class"]
    //     },
    //     state: scheduleData.state
    //   };
  
    //   cal.current.calendarInst.createSchedules([schedule]);
    // }, []);
  
    // const onBeforeDeleteSchedule = useCallback((res) => {
    //   const { id, calendarId } = res.schedule;  
    //   cal.current.calendarInst.deleteSchedule(id, calendarId);
    // }, []);
  
    // const onBeforeUpdateSchedule = useCallback((e) => {
    //   const { schedule, changes } = e;
  
    //   cal.current.calendarInst.updateSchedule(
    //     schedule.id,
    //     schedule.calendarId,
    //     changes
    //   );
    // }, []);
  
    function _getFormattedTime(time) {
      const date = new Date(time);
      const h = date.getHours();
      const m = date.getMinutes();
  
      return `${h}:${m}`;
    }
  
    function _getTimeTemplate(schedule, isAllDay) {
      const html = [];
  
      if (!isAllDay) {
        html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
      }
      if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(" Private");
      } else {
        if (schedule.isReadOnly) {
          html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule.recurrenceRule) {
          html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        } else if (schedule.attendees.length) {
          html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule.location) {
          html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }
        html.push(" " + schedule.title);
      }  
      return html.join("");
    }
  
    const templates = {
      time: function (schedule) {
        return _getTimeTemplate(schedule, false);
      }
    }; 
    
    // 이전, 이후, 오늘 구현부
    const NextButton = useCallback((e) => {
      if (cal !== null) {
        count = count +1;
        const calendarInstance = cal.current.getInstance();
        calendarInstance.next();        
        setMonth(month=>setMonth(month==12?1:month+1));
        setYear(year=> setYear(count%12 ==1? year+1 : year));        
      }      
    }, []);
  
    const PrevButton = useCallback((e) => {
      if (cal !== null) {
        count = count -1;
        const calendarInstance = cal.current.getInstance();
        calendarInstance.prev();
        setMonth(month=>setMonth(month==1?12:month-1));  
        setYear(year=> setYear(count%12 ==0? year-1 : year));       
      }
    }, []);
  
    const TodayButton = useCallback((e) => {
      if (cal !== null) {
        count = new Date().getMonth();
        const calendarInstance = cal.current.getInstance();
        calendarInstance.today();
        setMonth(month=>setMonth(new Date().getMonth()+1));
        setYear(year => setYear(new Date().getFullYear()));        
      }
    }, []);
    
    return(
      
      <div>
        <div id="menu">
          <span id="menu-navi">
            <button className={styles.button} onClick={TodayButton}>T</button>

            <button className={styles.button} onClick={PrevButton}>
              <i className="fas fa-caret-left"></i>
            </button>

            <button className={styles.button} onClick={NextButton}>
              <i className="fas fa-caret-right"></i>
            </button>            
          </span>

          <span className={styles.month}> {`${year}년`} </span>
          <span className={styles.month}> {`${month}월`} </span>
        </div>
        
        <TUICalendar
          ref={cal}
          height="770px"
          view="month"
          useCreationPopup={false}
          useDetailPopup={true}
          template={templates}
          calendars={calendars}
          schedules={schedules}
          onClickSchedule={onClickSchedule}
          // onBeforeCreateSchedule={onBeforeCreateSchedule}
          // onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          // onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        />
      </div>
    );  
  };


export default Calendar;