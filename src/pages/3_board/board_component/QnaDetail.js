import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from './QnaDetail.module.css';

const QnaDetail = ({ match }) => {
    const [detail, setDetail] = useState({});

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get("/board/qna/detail/" + match.params.id);
        await setDetail(result.data.result);
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>QnA</div>
            
            <div className={styles.contContainer}>
                <div className={styles.content}>

                    <div className={styles.header}>                      
                        <div className={styles.titleContainer}>
                            <div className={styles.signal}>QnA</div>
                            <div className={styles.titleValue}>{detail.bq_title}</div>
                        </div> 
                        <div className={styles.date}>{`작성 : ${detail.d_name}  |  작성 일자 : ${detail.bq_date}  |  조회 : ${detail.bq_hits}`}</div>
                    </div>  
                    <hr className   ={styles.underLine}/>                    
                    <div className={styles.contentBody}>{detail.bq_content}</div>                                    
                </div>

                <hr className={styles.underLine2}/>
                <div className={styles.footer}>                    
                    <div className={styles.cell1}>담당부서</div>
                    <div className={styles.cell}>{detail.d_name}</div>
                    <div className={styles.cell1}>전화번호</div>
                    <div className={styles.cell}>{detail.d_phone}</div>
                </div>
                <hr className={styles.underLine2}/>
            </div>
        </div>
    );
};

export default QnaDetail;
