import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from './QnaDetail.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const QnaDetail = ({ match }) => {
    const history = useHistory();
    const isAdmin = history.location.pathname.split("/")[2] == "admin" ? true : false;
    const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    
    const id = useParams().id;    
    const [empID, setEmpID] = useState('')
    const [detail, setDetail] = useState({});

    useEffect(() => {
        axios.get(`/employee/detail`,{headers: {
            'token': tmp
          }})
        .then((res) => 
         {
            console.log(res.data.result)
            setEmpID(res.data.result.e_id)
        } )
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get("/board/qna/detail/" + match.params.id);
        await setDetail(result.data.result);
        await console.log("result.data.result", result.data.result.e_id);
    };

    const onReply =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/board/qna/insert/${id}`);
    }

    const goModify =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/board/qna/update/${detail.bq_id}`);
    }

    const goDelete =async (event)=>{
        event.preventDefault();
        await axios.delete(`/board/qna/delete/${id}`);
        if(isAdmin){
            await history.push("/main/admin/board/qna");
        }else{
            await history.push("/main/board/qna");
        }        
    }
    
    return (
        <div className={styles.container}>
            <div className={isAdmin ? styles.adminTitle : styles.title}>QnA</div>
            
            <div className={styles.contContainer}>
                <div className={styles.content}>

                    <div className={styles.header}>                      
                        <div className={styles.titleContainer}>
                            <div className={isAdmin ? styles.adminSignal: styles.signal}>QnA</div>
                            <div className={styles.titleValue}>{detail.bq_title}</div>

                            <div className={styles.date}>
                                {`????????? : ${detail.e_name}  
                                |  ?????? ?????? : ${detail.bq_date}  
                                |  ?????? : ${detail.bq_hits}`}
                            </div>
                        </div> 

                        <div className={styles.charges}>                    
                            <div className={styles.cell1}><span className={styles.label}>?????? ?????? :</span> {detail.d_name}</div>
                            <div className={styles.cell2}><span className={styles.label}>???????????? :</span> {detail.d_phone}</div>
                        </div>
                    </div> 

                    <div className={styles.contentBody}>{detail.bq_content}</div>                                    
                </div>               
                {                                        
                    (empID==detail.e_id) &&                   
                    <div style={{ height:"50px"}}>
                        <button className={!isAdmin ? styles.button2 : styles.button3}  onClick ={goModify}>????????????</button>
                        <button className={!isAdmin ? styles.button4 : styles.button5}  onClick ={goDelete}>????????????</button>
                    </div>                   
                }
                 {
                    (isAdmin && detail.board_qna_bq_id ==0)&&                    
                    <button className={styles.button1} onClick={onReply}>????????????</button>                     
                }
                               
            </div>
        </div>
    );
};

export default QnaDetail;
