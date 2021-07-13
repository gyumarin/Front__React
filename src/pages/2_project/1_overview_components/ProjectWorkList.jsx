import React,{useState, useEffect} from 'react';
import styles from  './ProjectWorkList.module.css';
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
    <div className={styles.title}>This Week</div>
    </div>
    <div className={styles.tableContainer}>
      <ul className={styles.table}>
        {
          workList.map((work)=>{
            return (
            <li className={styles.list}>                  
              <div style={{display:'grid', gridTemplateColumns:'20% 72% 40px'}}>
                    <div>{work.wl_work}</div>
                    <div style={{marginRight:'1em', width : "90%"}}> {work.wl_work_detail}</div>
                    <div style={{marginRight : '2em', width : "100%" ,marginBottom:'auto',widheight:'20px',textAlign:'center',backgroundColor:'#0d6efd', color:'white', borderRadius:'5px'}}> D-{(new Date(work.wl_date_end).getTime() - new Date(work.wl_date_start).getTime())/ (1000*60*60*24)} </div>
                  </div>
            </li>
            );  
          })
        }                    
      </ul>
    </div> 
  </div>
  );  
};
export default ProjectWorkList;

