import React,{useState, useEffect} from 'react';
import styles from  './ProjectWorkList.module.css';
import mockData from '../../../Data/data';
import axios from 'axios';

const ProjectWorkList = ({projectID}) => {

  const [workList, setWorkList] = useState([])
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/work/list/person?p_id=${projectID}&token=${tmp}`).then(res=>{
          // console.log(res.data.result)
          setWorkList(res.data.result)
          
        })
    }, [])
  
  return(
    <div className={styles.container}>
    <div className={styles.header}>
    <div className={styles.title}>Today</div>
    </div>
    <div className={styles.tableContainer}>
      <ul className={styles.table}>
        {
          workList.map((work)=>{
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