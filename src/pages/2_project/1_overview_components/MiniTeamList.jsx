import React from 'react';
import styles from './MiniTeamList.module.css';
const array = [
  {
    name : '강세훈',
    position : '프론트엔드',
    in : true,
    out : false,    
  },
  {
    name : '박규민',
    position : 'PM',
    in : true,
    out : true,    
  },
  {
    name : '류현태',
    position : '백엔드',
    in : false,
    out : false,    
  },
];
const MiniTeamList = (props) => {
    return(
        <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.title}>프로젝트 인원</div>
        </div>
        <div className={styles.tableContainer}>
          
          {
            array.map((man)=>{
              return (
                <div className={styles.teamList}>
                  <div className={styles.photo}>
                    <img className={styles.image} src="../../images/example.jpg" alt="team" />
                  </div>
                  <div className={styles.name}>{man.name}</div>
                  <div className={styles.position}>{man.position}</div>
                  <div className={man.in?styles.yes:styles.no}></div>
                  <div className={man.out?styles.yes:styles.no}></div>
                  <button className={styles.buttomMail}><i className="far fa-envelope"></i></button>
                </div>
              );
            })
            
          }          
        </div> 
      </div>
    );
};

export default MiniTeamList;