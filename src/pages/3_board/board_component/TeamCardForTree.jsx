import React from 'react';
import styles from './TeamCardForTree.module.css';
import { Link } from 'react-router-dom';

const TeamCardForTree = ({team}) => {
    return(
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <img className={styles.image} src="../../images/example.jpg" alt="face image" />        
            </div>
            <div className={styles.contentContainer}>
                <span>{team.nickname}</span> / <span>{team.name}</span>
                <div>{team.team}</div>
                <div>{team.tel} 
                    <Link className ={styles.btnMail}to="/main/mail/write"><i className="fas fa-envelope"></i></Link>
                </div>
                
                <hr className={styles.hr}/>

       
      </div> 
        </div>
    );
};

export default TeamCardForTree;