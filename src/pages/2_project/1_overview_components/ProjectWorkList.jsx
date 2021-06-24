import React from 'react';
import styles from  './ProjectWorkList.module.css';
import mockData from '../../../Data/data';

const ProjectWorkList = (props) => {
  return(
    <div className={styles.container}>
    <div className={styles.header}>
    <div className={styles.title}>Today</div>
    </div>
    <div className={styles.tableContainer}>
      <ul className={styles.table}>
        {
          mockData.work.map((work)=>{
            return (
            <li className={styles.list}>{work.wl_work} {work.wl_work_detail} {work.wl_date_end} </li>
            );  
          })
        }                    
      </ul>
    </div> 
  </div>
  );  
};
export default ProjectWorkList;