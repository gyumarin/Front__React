import React from 'react';
import styles from './LeftOverView.module.css';
import MiniCommit from './MiniCommit';
import MiniTeamList from './MiniTeamList';

const LeftOverView = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.projectInfo}>
                <h3 className={styles.h3}>SSG 휘트니스 서비스</h3>
                <p className={styles.p}>프로젝트 기간 : 2021.09.12 ~ 2021.09.12</p>
            </div>

            <div className={styles.lists}>
                <MiniCommit/>
                <MiniTeamList/>
            </div>          
        </div> 
    );
};

export default LeftOverView;