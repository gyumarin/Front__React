import React from 'react';
import styles from './MiniProfile.module.css';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';

const MiniProfile = ({removeLoginToken, userInfo}) => {
  
  const history = useHistory();
  const onLogout = () =>{
    removeLoginToken();
    sessionStorage.removeItem('token')
    history.push('/');
    alert('로그아웃 되었습니다.')
  }


  return(
    <div className={styles.container}>
      ui8op3 /
      <div className={styles.cardContainer}>
         <img className={styles.image} src={userInfo.e_photo} alt="face image" />     
      </div>
      <h2 className={styles.slogan}>Maxmizing Potetial</h2>
      
      {/* 사진 밑으로 */}
      <div className={styles.contentContainer}>
        <span>{userInfo.e_name}</span> / <span>{userInfo.e_rank}</span>
        <hr className={styles.hr}/>

        <div className={styles.buttonContainer}>
          <Link className ={styles.btnMypage}to="/main/myPage/commute"><i className="fas fa-user"></i> MyPage</Link>        
          <Link className ={styles.btnMail}to={`/main/mail/send/${userInfo.e_id}`}><i className="fas fa-envelope"></i> Mail</Link>
          <button onClick ={onLogout} className ={styles.btnLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>
        <hr className={styles.hr}/>
      </div> 
    </div>
  );
}

export default MiniProfile;