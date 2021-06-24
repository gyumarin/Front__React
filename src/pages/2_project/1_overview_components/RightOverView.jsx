import React from 'react';
import MiniWorkList from '../../../common/components/MiniWorkList';
import ProjectWorkList from './ProjectWorkList';
import styles from './RightOverView.module.css';
import Calendar from '../2_workCalendar_components/Calendar';

const RightOverView = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.up}>
                <div className={styles.work}>
                    <div className={styles.title}>강세훈 님 업무 현황</div>
                    <div className={styles.workList}>
                        <ProjectWorkList/>
                    </div>
                </div>
                <div className={styles.pieChart}>
                    {/* <div></div>  팀의 전체 퍼센티지 */}
                    {/* <div></div>  나의 업무 중 수행 퍼센티지*/}
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