import React from 'react';
import styles from './MiniWorkList.module.css';
import mockData from '../../Data/data.js';
import {Link} from  'react-router-dom';

const MiniWorkList = (props) => {
    return(
      <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.title}>업무 리스트</div>
        <Link to="/main/project/workList"><button className={styles.button}>바로가기</button></Link>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}></th>
                <th className={styles.th}>카테고리</th>
                <th className={styles.th}>작업</th>
                <th className={styles.th}>작업 상세</th>
                <th className={styles.th}>남은 일수</th>
              </tr>
            </thead>

            <tbody >
              {
                mockData.work.map((work)=>{
                  return (<tr className={styles.tr}>
                    <td className={styles.numtd}>{work.wl_id}</td>
                    <td className={styles.td}>{work.wl_work_category}</td>
                    <td className={styles.td}>{work.wl_work}</td>
                    <td className={styles.td}>{work.wl_work_detail}</td>
                    <td className={styles.td}>{work.wl_date_end}</td>                    
                  </tr>);  
                })
              }
                         
            </tbody>
          </table>
        </div> 
      </div>
    );
};

export default MiniWorkList;

