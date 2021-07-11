import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AdminTeamList.module.css';

const AdminTeamList = (props) => {
    const param = useParams();

    const [team, setTeam]=useState([]); 
    axios.get(`/project/list/emp/${param.id}`)
    .then(res=>{
      setTeam(res.data.result);
      }      
    );

    return(
        <div className={styles.container}>
        <div className={styles.title}>팀원 리스트</div>   
        <div className={styles.content}>
          <div style={{width : '100%', height : '255px', display: 'flex', flexWrap : "wrap"}}>
          {
            team.map((man)=>{
              return (
                 <div className={styles.card} id={man.ep_id}>
                  <img
                    className={styles.image}
                    src={man.e_photo}
                    alt="face image"
                  />
                  <div className={styles.cardContents}>
                    <div className={styles.text1}>{man.ep_position}</div>
                    <div className={styles.text2}>{man.e_name}({man.e_rank})</div>
                  </div>
                 </div>
              )              
            })
          }
          </div>
        </div>
      </div>
    );
}
export default AdminTeamList;

