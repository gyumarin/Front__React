import React,{useCallback, useEffect, useState} from 'react';
import styles from './WaitingConfirmCard.module.css';

const WaitingConfirmCard = ({confirm, onApply, onIgnore}) => {
    // console.log(confirm);
    const [toggle, setToggle] = useState(false)
    const [inputText, setInputText] = useState('');


    // input box 값.
    const onChange = useCallback((e) => {
        setInputText(e.target.value);
    }, []);

    return(
        <div>
            <div className={styles.container}>
                {/* contents */}
                <div className={styles.left}>
                    <div className={styles.top}>
                        <p className={styles.number}>No. {confirm.wl_id}</p>
                        <p className={styles.date}> {confirm.wl_date_start} ~ {confirm.wl_date_end}</p>
                        <p className={styles.dday}> D-{(new Date(confirm.wl_date_end).getTime() - new Date(confirm.wl_date_start).getTime())/ (1000*60*60*24)}  </p>
                    </div>

                    <div className={styles.middle}>
                        <p className={styles.work}>업무 : {confirm.wl_work}</p>
                    </div>

                    <div className={styles.bottom}>
                        <p className={styles.detail}>세부 업무 : {confirm.wl_work_detail}</p>
                        <p className={styles.manager}>담당자 : {confirm.e_name}</p>
                    </div>
                </div>
                {/* buttons */}
                <div className={styles.right}>
                    <button className={styles.btnConfirm} onClick={()=>onApply(confirm.wl_id)}>확인</button>            
                    <button className={styles.btnReject} onClick={()=>setToggle(!toggle)}>반려</button>            
                </div>
            </div>
            {toggle&&
                <div className={styles.ignore}>
                    <div className={styles.signal}><i className="fab fa-replyd"></i></div>
                    <textarea onChange ={onChange} className={styles.ignoreInput}></textarea>      
                    <button className={styles.ignoreButton} onClick={()=>{onIgnore(confirm.wl_id, inputText); setToggle(!toggle)}}>반려 사유 보내기</button>      
                </div>
            }
        </div>
    );
};
export default WaitingConfirmCard;