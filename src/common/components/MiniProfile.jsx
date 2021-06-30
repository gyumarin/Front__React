import React from 'react';
import styles from './MiniProfile.module.css';
import {Link} from 'react-router-dom';

const MiniProfile = (props) => {
  return(
    <div className={styles.container}>
      
      <div className={styles.cardContainer}>
        <img className={styles.image} src="../images/example.jpg" alt="face image" />        
      </div>
      <h2 className={styles.slogan}>Maxmizing Potetial</h2>
      
      {/* 사진 밑으로 */}
      <div className={styles.contentContainer}>
        <span>이주빈</span> / <span>풀스택</span>
        <hr className={styles.hr}/>

        <div className={styles.buttonContainer}>
          <Link className ={styles.btnMypage}to="/main/myPage/commute"><i className="fas fa-user"></i> MyPage</Link>        
          <Link className ={styles.btnMail}to="/main/mail/send/1005"><i className="fas fa-envelope"></i> Mail</Link>
          <button className ={styles.btnLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>
        <hr className={styles.hr}/>
      </div> 
    </div>
  );
}

export default MiniProfile;