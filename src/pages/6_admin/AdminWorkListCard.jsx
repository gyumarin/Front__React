import React from 'react';
import styles from './AdminWorkListCard.module.css';
import { useEffect } from 'react';
import axios from 'axios';

const AdminWorkListCard = ({midCategoryName, details, setUpdateDetails, setIsUpdate}) =>{
    // useEffect(()=>{console.log(details);},[details])

    const onDelete =(event)=>{
        event.preventDefault();
        // console.log(details.wl_id);
        const isDelete = window.confirm("해당 업무를 정말 삭제하시겠습니까?");
        if(!isDelete)return;
        axios.delete(`/project/work/delete/${details.wl_id}`).then(res => console.log(res.data.result));
    }

    const onUpdate =(event)=>{
        event.preventDefault();
        // console.log(details);
        setUpdateDetails(details);
        setIsUpdate(true);
    }

    return(
        <div className={styles.container}>
        {/* contents */}
        <div className={styles.left}>
            <div className={styles.top}>
                <p className={styles.number}>No. {details.wl_id}</p>
                <p className={styles.date}>{details.d_start} ~ {details.d_end}</p>
                <p className={styles.dday}> D-{(new Date(details.d_end).getTime() - new Date(details.d_start).getTime())/ (1000*60*60*24)} </p>
            </div>

            <div className={styles.middle}>
                <p className={styles.work}>업무 : {midCategoryName} </p>
            </div>

            <div className={styles.bottom}>
                <p className={styles.detail}>세부 업무 : {details.d_name}</p>
                <p className={styles.manager}>담당자 : {details.d_charge}</p>
            </div>
        </div>
        {/* buttons */}
        <div className={styles.right}>
            <button className={styles.btnConfirm} onClick ={onUpdate}>수정</button>            
            <button className={styles.btnReject} onClick={onDelete}>삭제</button>            
        </div>
    </div>
    );
};

export default AdminWorkListCard;
