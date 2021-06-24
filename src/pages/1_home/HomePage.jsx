import React from 'react';
import styles from './HomePage.module.css';
import TopNavBar from '../../common/components/TopNavBar.jsx';
import LeftNavBar from '../../common/components/LeftNavBar.jsx';
import Project from '../../common/components/Project.jsx';
import Title from '../../common/components/Title.jsx';
import mockData from '../../Data/data';
import MiniNotice from '../../common/components/MiniNotice';
import MiniWorkList from '../../common/components/MiniWorkList';
import CommuteCalender from '../../common/components/CommuteCalender';
const HomePage = (props) =>{
  const projects = mockData.project;

  return(
    <div className={styles.wholeContainer}>
      <Title/>
      <div className={styles.contentContainer}>
        <LeftNavBar/>
        <div className={styles.body}>
          <div className={styles.leftBody}>
            <div className={styles.titleContainer}>
             <span className={styles.title}>진행중인 프로젝트</span>    
             <span className={styles.projectNumber}>{mockData.project.length}</span>  
            </div>
            
            <div className={styles.projectContainer}>
              {                
                projects.map((project)=>{
                  return <Project
                    id ={project.p_id}
                    key = {project.p_id}
                    title = {project.p_title}
                    start = {project.p_date_start}
                    end = {project.p_date_end}
                    total = {project.p_Totalpersent}
                    success = {project.p_success}
                  />
                })
              }
            </div>
          </div>

          <div className={styles.rightBody}>
            <div className={styles.calender}>
              <div>
              <CommuteCalender/>
              </div>
            </div>

            <div className={styles.dataList}>
              <MiniNotice/>
              <MiniWorkList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;