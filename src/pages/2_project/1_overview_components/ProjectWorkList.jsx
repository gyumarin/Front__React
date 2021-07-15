import React,{useState, useEffect} from 'react';
import styles from  './ProjectWorkList.module.css';
import axios from 'axios';

const ProjectWorkList = ({projectID}) => {

  const [workList, setWorkList] = useState([])
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/work/list/person/week?p_id=${projectID}&token=${tmp}`).then(res=>{
          setWorkList(res.data.result)
          
        })
    }, [])
 
  return(
    <div className={styles.container}>
    <div className={styles.header}>
    <div className={styles.title}>This Week</div>
    </div>
    {workList.length==0?
     
     <div style={{textAlign:'center',marginLeft:'0px',paddingLeft:'10px',
       height:'250px',width : '440px',fontSize:'15px', paddingTop:'50px',
       paddingBottom:'40px',fontWeight:'bold', fontFamily:"Noto Sans", borderRadius:'10px'}} >
         <span><i style={{fontSize:'90px',color :'#0d6efd',marginBottom:'10px'}} className="far fa-clipboard" ></i></span>
         <p>이번 주 진행 하실 업무가 없습니다.</p>
     </div>
     :
      <div className={styles.tableContainer}>
        <ul className={styles.table}>
          {
            workList.map((work)=>{
              return (
              <li key ={work.wl_id}className={styles.list}>                  
                <div style={{display:'grid', gridTemplateColumns:'20% 72% 40px'}}>
                      <div>{work.wl_work}</div>
                      <div style={{marginRight:'1em', width : "90%", }}> {work.wl_work_detail}</div>
                      <div style={{marginRight : '2em', width : "100%" ,marginBottom:'auto',widheight:'20px',textAlign:'center',backgroundColor:'#0d6efd', color:'white', borderRadius:'5px'}}> D-{(new Date(work.wl_date_end).getTime() - new Date(work.wl_date_start).getTime())/ (1000*60*60*24)} </div>
                    </div>
              </li>
              );  
            })
          }                    
        </ul>
      </div>
   
    } 
  </div>
  );  
};
export default ProjectWorkList;

