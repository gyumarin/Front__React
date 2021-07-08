import React,{useEffect, useState} from 'react';
import axios from 'axios';
import styles from './MiniWorkList.module.css';
import {Link} from  'react-router-dom';


const MiniWorkList = (props) => {
  const [workList, setWorkList] = useState([])
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/work/list/person/all?token=${tmp}`).then(res=>{   
          console.log('MiniWorkList',res.data.result);                 
          setWorkList(res.data.result)          
        })
    }, [])

    return(
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Week WorkList</div>        
        </div>

       
        <div className={styles.tableContainer}>
          <div className={styles.thead}>
            <div className={styles.th1}>프로젝트 명</div>                  
            <div className={styles.th2}>분류</div>
            <div className={styles.th3}>세부사항</div>
            <div className={styles.th4}>D-day</div>                    
            <div className={styles.th5}></div>  
          </div>
          <div className={styles.table}>
            
              {
                workList.map((work)=>{
                  return (<div className={styles.tr}>
                    <div className={styles.td1}>{work.p_title}</div>
                    {/* <td className={styles.numtd}>{work.wl_id}</td> */}
                    {/* <td className={styles.td}>{work.wl_work_category}</td> */}
                    <div className={styles.td2}>{work.wl_work}</div>
                    <div className={styles.td3}>{work.wl_work_detail}</div>
                    <div className={(new Date(work.wl_date_end).getTime() - new Date(work.wl_date_start).getTime())/ (1000*60*60*24) <= 5 ? styles.td4 : styles.td_4}> 
                      {(new Date(work.wl_date_end).getTime() - new Date(work.wl_date_start).getTime())/ (1000*60*60*24)}
                    </div>                    
                    <div className={styles.td5}>
                                              {/* 여기 wl_id날린 이유는 나중에 해당 id를 검색한 곳으로 날리기 위해서. */}
                      <Link to={`/main/project/${work.p_id}/workList/${work.wl_id}`}>
                        
                        <button className={styles.button}><i className="fas fa-sign-in-alt"></i></button>
                      </Link>
                    </div>  
                  </div>);  
                })
              }
                         
           
          </div>
        </div> 
      </div>
    );
};

export default MiniWorkList;


