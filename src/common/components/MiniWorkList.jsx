import React,{useEffect, useState} from 'react';
import axios from 'axios';
import styles from './MiniWorkList.module.css';
import {Link} from  'react-router-dom';


const MiniWorkList = (props) => {

  const date = new Date();
  // console.log(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);

  const [workList, setWorkList] = useState([])
    useEffect(() => {
       const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/work/list/person/all/week`,{headers: {
          'token': tmp
        }}).then(res=>{   
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
            
              {workList.length!=0?
                workList.map((work)=>{
                  return (<div key ={work.wl_id} className={styles.tr}>
                    <div className={styles.td1}>{work.p_title}</div>                   
                    <div className={styles.td2}>{work.wl_work}</div>
                    <div className={styles.td3}>{work.wl_work_detail}</div>
                    <div className={Math.floor((new Date(work.wl_date_end).getTime() - new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).getTime())/ (1000*60*60*24)) <= 5 ? styles.td4 : styles.td_4}> 
                       {Math.floor((new Date(work.wl_date_end).getTime() - new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).getTime())/ (1000*60*60*24)) < 0 ? "만료" 
                       :Math.floor((new Date(work.wl_date_end).getTime() - new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).getTime())/ (1000*60*60*24)) }
                    </div>                    
                    <div className={styles.td5}>
                                              {/* 여기 wl_id날린 이유는 나중에 해당 id를 검색한 곳으로 날리기 위해서. */}
                      <Link to={`/main/project/${work.p_id}/workList/${work.wl_id}`}>
                        
                        <button className={styles.button}><i className="fas fa-sign-in-alt"></i></button>
                      </Link>
                    </div>  
                  </div>);  
                })
              :
              <div style={{textAlign:'center',marginLeft:'0px',paddingLeft:'60px',
                height:'250px',width : '600px',fontSize:'15px', paddingTop:'30px',
                paddingBottom:'40px',fontWeight:'bold', fontFamily:"Noto Sans", borderRadius:'10px'}} >
                  <span><i style={{fontSize:'90px',color :'#0d6efd',marginBottom:'10px'}} className="far fa-clipboard" ></i></span>
                  <p>이번 주 진행 하실 업무가 없습니다.</p>
              </div>
              }          
          </div>
        </div> 
      </div>
    );
};

export default MiniWorkList;

