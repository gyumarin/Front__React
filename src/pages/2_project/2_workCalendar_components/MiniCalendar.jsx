import React, { useCallback, useRef } from 'react';
import styles from './Calendar.module.css';

import MyCalendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import { useState, useEffect } from 'react';
import axios from 'axios';

const MiniCalendar = ({projectID, isTeam}) => {
   // ----------------------------------------------------------------    
   const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);   

   const [schedules, setSchedules] = useState([]);
   const [labelColor, setLabelColor] = useState([]);

   const [teamSchedules, setTeamSchedules] = useState([]);
   const [teamLabelColor, setTeamLabelColor] = useState([]);
   const colors = [
     "rgba(255, 82,  111, 0.7)",   // 1. 빨갱이
     "rgba(255, 110, 243, 0.7)",   // 2. 분홍이
     "rgba(187, 110, 255, 0.7)",   // 3. 아이유
     "rgba(114, 110, 255, 0.7)",   // 4. 파랭이
     "rgba(255, 246, 84,  0.7)",   // 10. 노랭이
     "rgba(110, 241, 255, 0.7)",   // 6. 구르미
     "rgba(255, 246, 84,  0.7)",   // 10. 노랭이
     "rgba(71,  255, 182, 0.7)",   // 7. 초록이
     "rgba(59,  255, 41,  0.7)",   // 8. 초록이 동생
     "rgba(199, 255, 94,  0.7)",   // 9. 초록이 둘째 동생
     "rgba(255, 246, 84,  0.7)",   // 10. 노랭이
     "rgba(255, 180, 89,  0.7)",   // 11. 당그니
     "rgba(255, 118, 59,  0.7",    // 12. 주황이
     
   ]
   // Get 개인 프로젝트 업무 데이터  --------------------------------
   useEffect(()=>{      
     axios.get(`/project/work/list/person?p_id=${projectID}`,{headers: {
      'token': tmp
    }})
     .then(res => res.data.result)
     .then(data =>{
         const scheduleData = data.map(item=>{
           return({
             calendarId: item.wl_id,
             category: "allday",
             isVisible: true,
             isPending: false,
             title: item.wl_work_detail,
             id: item.wl_id,
             body: item.wl_work_category + " > " + item.wl_work + " > " + item.wl_work_detail,
             start : item.wl_date_start,
             end : item.wl_date_end
           });
         });
         
         const labelColorData = data.map((item,index)=>{
           const per = 255/(data.length);
           return({
             id: item.wl_id,
             name:item.e_name,
             color: "rgba(0,0,0,1)",
             bgColor: `rgba(${per*index},  ${255-per*index*0.8}, 242, 0.7)`,
             dragBgColor: `rgba(${per*index}, ${255- per*index*0.8}, 242, 0.8)`,
             borderColor: `rgba(${per*index}, ${255- per*index*0.8}, 242, 0.8)`
           });
         });

         return [scheduleData,labelColorData];                
       }
     )
     .then(newSchedule=>{
         setSchedules(newSchedule[0]);
         setLabelColor(newSchedule[1]);
       }
     );
   },[]);

   // Get 팀 프로젝트 업무 데이터  --------------------------------
   
   useEffect(()=>{      
     axios.get(`/project/work/list/team/${projectID}`)
     .then(res => res.data.result)
     .then(data =>{
         const teamScheduleData = data.map(item=>{
           return({
             calendarId: item.e_id,
             category: "time",
             isVisible: true,
             isPending: false,
             title: item.wl_work_detail,
             id: item.wl_id,
             body: item.wl_work_category + " > " + item.wl_work + " > " + item.wl_work_detail,
             start : item.wl_date_start,
             end : item.wl_date_end
           });
         });

         const teamSet = new Set(data.map(item=>item.e_id));
         
         const teamLabelColorData = [...teamSet].map((item,index)=>{                
           return({
             id: item,
             name: data.find(i => i.e_id == item).e_name,
             color: "rgba(0,0,0,1)",
             bgColor: colors[index],
             dragBgColor: colors[index],
             borderColor: colors[index],
           });
         });

         return [teamScheduleData,teamLabelColorData];                
       }
     )
     .then(newSchedule=>{
         setTeamSchedules(newSchedule[0]);
         setTeamLabelColor(newSchedule[1]);
       }
     );
   },[]);
   // ----------------------------------------------------------------

   const [selectedDay, setSelectedDay] = useState();
   useEffect(() => {
   }, [selectedDay]);

   // ----------------------------------------------------------------

   const [month, setMonth] =useState(new Date().getMonth()+1);
   const [year, setYear] = useState(new Date().getFullYear());
   let count = new Date().getMonth()+1;
  
   const calendarRef = useRef(null);    
   
   // 이전, 이후, 오늘 구현부 ----------------------------------------
   const NextButton = useCallback((e) => {
     if (calendarRef !== null) {
       count = count +1;
       const calendarInstance = calendarRef.current.getInstance();
       calendarInstance.next();        
       setMonth(month=>setMonth(month==12?1:month+1));
       setYear(year=> setYear(count%12 ==1? year+1 : year));        
     }      
   }, []);
 
   const PrevButton = useCallback((e) => {
     if (calendarRef !== null) {
       count = count -1;
       const calendarInstance = calendarRef.current.getInstance();
       calendarInstance.prev();
       setMonth(month=>setMonth(month==1?12:month-1));  
       setYear(year=> setYear(count%12 ==0? year-1 : year));       
     }
   }, []);
 
   const TodayButton = useCallback((e) => {
     if (calendarRef !== null) {
       count = new Date().getMonth();
       const calendarInstance = calendarRef.current.getInstance();
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
       
       <MyCalendar
         ref={calendarRef}
         height = "735px"
         view={"month"}
         month={{
           daynames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
           startDayOfWeek: 0,
           narrowWeekend: false
         }}
         schedules ={isTeam ? teamSchedules : schedules}
         calendars = {isTeam ? teamLabelColor : labelColor}
         onBeforeCreateSchedule={e => {setSelectedDay(e);}}
         useDetailPopup
         isReadOnly  = "true"
        
       />
    </div>
   );  
 };
 
export default MiniCalendar;