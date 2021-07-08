import React from 'react';
import styles from './TeamCardForTree.module.css';
import { Link } from 'react-router-dom';

const TeamCardForTree = ({team}) => {
    console.log(team);
    return(
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <img className={styles.image} src={team.e_photo} alt="face image" />        
            </div>
            <div className={styles.contentContainer}>
                <span>{team.e_name}</span>
                <div>{team.d_name}</div>
                <div>{team.e_e_phone} 
                    <Link className ={styles.btnMail}to={`/main/mail/write/`+team.e_id}><i className="fas fa-envelope"></i></Link>
                </div>
                
                <hr className={styles.hr}/>

       
      </div> 
        </div>
    );
};

export default TeamCardForTree;