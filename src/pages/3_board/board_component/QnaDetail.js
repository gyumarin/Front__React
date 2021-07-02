import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from './QnaDetail.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const QnaDetail = ({ match }) => {
    const history = useHistory();
    const id = useParams().id;
    
    const isAdmin = history.location.pathname.split("/")[2] == "admin" ? true : false;

    const [detail, setDetail] = useState({});

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get("/board/qna/detail/" + match.params.id);
        await setDetail(result.data.result);
    };

    const onReply =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/board/qna/insert/${id}`);
    }
    
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
                    <hr className={styles.underLine}/>                    
                    <div className={styles.contentBody}>{detail.bq_content}</div>                                    
                </div>
                {
                    isAdmin 
                    ? <button className={styles.button} onClick={onReply}>답변하기</button>                     
                    : null
                }
                {
                    isAdmin 
                    ? <button className={styles.button1}><Link to={`/main/admin/board/qna/update/${detail.bq_id}`}>수정하기</Link></button>
                    : <button className={styles.button1}><Link to={`/main/board/qna/update/${detail.bq_id}`}>수정하기</Link></button>
                }
                

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
