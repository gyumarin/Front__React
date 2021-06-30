import React from 'react';
import styles from  './PwdPopup.module.css';

const PwdPopup = (props) => {
    return(
        <div className={styles.container}>
           <h5 className={styles.title}>비밀번호 변경</h5>             
           <p className={styles.warn1}>안전한 비밀번호로 내 정보를 보호하세요</p>
           <p className={styles.warn2}>- 다른 아이디/사이트에서 사용한 적 없는 비밀번호</p>
           <p className={styles.warn2}>- 이전에 사용한 적 없는 비밀번호가 안전합니다.</p>
           <form action="">
               <table className={styles.inputs}>
                <tr><input className={styles.input} type="password" placeholder="현재 비밀번호" /></tr>
                <tr><input className={styles.input} type="password" placeholder="새 비밀번호" /></tr>
                <tr><input className={styles.input} type="password" placeholder="새 비밀번호 확인" /></tr>

                <tr><input className={styles.button1} type="submit" value="확인" /></tr>
                <tr><input className={styles.button2} type="reset" value="취소" /></tr>
               </table>
           </form>
           <div className={styles.lock}>
            <i className="fas fa-lock"></i>
           </div>
        </div>
    );
}

export default PwdPopup;