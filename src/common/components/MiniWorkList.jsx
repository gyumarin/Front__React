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
          <table className={styles.table}>
            <tbody>
              {
                workList.map((work)=>{
                  return (<tr className={styles.tr}>
                    <td className={styles.td}>{work.p_title}</td>
                    {/* <td className={styles.numtd}>{work.wl_id}</td> */}
                    {/* <td className={styles.td}>{work.wl_work_category}</td> */}
                    <td className={styles.td}>{work.wl_work}</td>
                    <td className={styles.td}>{work.wl_work_detail}</td>
                    <td className={styles.td}> {(new Date(work.wl_date_end).getTime() - new Date(work.wl_date_start).getTime())/ (1000*60*60*24)}</td>                    
                    <td className={styles.td}>
                                              {/* 여기 wl_id날린 이유는 나중에 해당 id를 검색한 곳으로 날리기 위해서. */}
                      <Link to={`/main/project/${work.p_id}/workList/${work.wl_id}`}>
                        
                        <button className={styles.button}><i className="fas fa-sign-in-alt"></i></button>
                      </Link>
                    </td>  
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


