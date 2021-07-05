import React,{useEffect, useState} from 'react';
import styles from './PeopleListPage.module.css';
import TeamCard from './TeamCard';
import axios from 'axios';
const PeopleListPage = ({projectID}) => {

  const [empList, setEmpList] = useState([])
  const [projectInfo, setProjectInfo] = useState([])
    useEffect(() => {
        // console.log('projectID', projectID)
        axios.get(`/project/list/emp/${projectID}`).then(res =>{
          setEmpList(res.data.result)
          // console.log(res.data.result)
            
        })

        axios.get(`/project/detail/${projectID}`).then(res =>{
          setProjectInfo(res.data.result)
          // console.log(res.data.result)       
      })
    }, [])   
  
    return(
      <div className={styles.container}>
        <h3 className={styles.h3}>{projectInfo.p_title}<font style={{marginLeft : '16px' ,fontSize:'18px', color : 'rgba(1, 1, 1, 0.3)'}}>프로젝트 참여 리스트</font></h3>                
        <div className={styles.content}>
          {
            empList.map((worker)=>{
              return <TeamCard
                worker = {worker}
              />
            })

          }         
        </div>            
      </div> 
    );
};

export default PeopleListPage;