import React,{useEffect, useState} from 'react';
import MiniWorkList from '../../../common/components/MiniWorkList';
import ProjectWorkList from './ProjectWorkList';
import styles from './RightOverView.module.css';
import Calendar from '../2_workCalendar_components/Calendar';
import Doughnut2 from './Doughnut2';
import axios from 'axios';

const RightOverView = ({projectID}) => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        if(sessionStorage.getItem('token')){
          axios.get(`/employee/detail?token=${tmp}`).then(res=>{
            setUserInfo(res.data.result);
          })
          
        }
      }, [])

    return(
        <div className={styles.container}>
            <div className={styles.up}>
                <div className={styles.work}>
                    <div className={styles.title}>{userInfo.e_name}님 업무 현황</div>
                    <div className={styles.workList}>
                        <ProjectWorkList projectID={projectID}/>
                    </div>
                </div>
                <div className={styles.pieChart}>
                    <Doughnut2 projectID={projectID}/>
                </div>
            </div>
            <div className={styles.down}>
                <div className={styles.calendarContainer}>
                    <div className={styles.innerContainer}>
                    <Calendar />
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default RightOverView;