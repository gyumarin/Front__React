import React ,{useEffect, useState}from 'react';
import styles from './MiniTeamList.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios'



const MiniTeamList = ({projectID}) => {

  const [empList, setEmpList] = useState([])

    useEffect(() => {
        axios.get(`/project/list/emp/${projectID}`).then(res =>{
          setEmpList(res.data.result)
            
        })
    }, [])
    
    return(
        <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.title}>프로젝트 인원</div>
        </div>
        <div className={styles.tableContainer}>
          
          {
            empList.map((emp)=>{
              return (
                <div key = {emp.e_id} className={styles.teamList}>
                  <div className={styles.photo}>
                    <img className={styles.image} src={emp.e_photo} alt="team" />
                  </div>
                  <div className={styles.name}>{emp.e_name}</div>
                  <div className={styles.position}>{emp.ep_position}</div>
                  <div className={emp.commuteCheck?styles.yes:styles.no}> </div>
                  <Link to={`/main/mail/write/${emp.e_id}`}><button className={styles.buttomMail}><i className="far fa-envelope"></i></button></Link>
                </div>
              );
            })
            
          }          
        </div> 
      </div>
    );
};

export default MiniTeamList;