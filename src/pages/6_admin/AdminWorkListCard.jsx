import React from 'react';
import styles from './AdminWorkListCard.module.css';

const AdminWorkListCard = (props) =>{
    return(
        <div className={styles.container}>
        {/* contents */}
        <div className={styles.left}>
            <div className={styles.top}>
                <p className={styles.number}>No. 2</p>
                <p className={styles.date}>2222222222222</p>
                <p className={styles.dday}> D-2 </p>
            </div>

            <div className={styles.middle}>
                <p className={styles.work}>업무 :ddfdfd </p>
            </div>

            <div className={styles.bottom}>
                <p className={styles.detail}>세부 업무 : dfdsfsf</p>
                <p className={styles.manager}>담당자 : asfassaf</p>
            </div>
        </div>
        {/* buttons */}
        <div className={styles.right}>
            <button className={styles.btnConfirm}>수정</button>            
            <button className={styles.btnReject}>삭제</button>            
        </div>
    </div>
    );
};

export default AdminWorkListCard;
// D-{(new Date(confirm.wl_date_end).getTime() - new Date(confirm.wl_date_start).getTime())/ (1000*60*60*24)}
// confirm.wl_id
// {confirm.wl_date_start} ~ {confirm.wl_date_end}
// {confirm.wl_work}
// {confirm.wl_work_detail}
// {confirm.e_name}