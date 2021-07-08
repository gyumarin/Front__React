import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from './NoticeDetail.module.css';

import { Link, useHistory } from 'react-router-dom';

const NoticeDetail = ({ match }) => {
    const history = useHistory();
    const isAdmin = history.location.pathname.split("/")[2] == "admin"? true : false;

    const [detail, setDetail] = useState({});

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get(
            "/board/notice/detail/" + match.params.id
        );
        await setDetail(result.data.result);        
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>공지사항</div>

            <div className={styles.contContainer}>

                <div className={styles.content}>

                    <div className={styles.header}>    
                        <div className={styles.titleContainer}>         
                            <div className={styles.signal}>제목 </div>
                            <div className={styles.titleValue}>{detail.bn_title}</div>        

                            <div className={styles.date}>
                                {`작성 : ${detail.d_name}  
                                |  작성 일자 : ${detail.bn_date}  
                                |  조회 : ${detail.bn_hits}`}
                            </div>                 
                        </div> 
                        
                        <div className={styles.charges}>
                            <div className = {styles.cell1}><span className={styles.label}>게시자 소속부서 : </span>{detail.d_name}</div> |
                            <div className = {styles.cell2}><span className={styles.label}>전화번호 :</span> {detail.d_phone}</div>
                        </div>                                                                               
                    </div>
                    
                    <div className={styles.contentBody}>{detail.bn_content}</div>                
                </div>

            {
              isAdmin 
              ? <button><Link to={`/main/admin/board/notice/update/` + match.params.id}>수정</Link></button>
              : null
            }
            {/* <button>목록보기</button> */}
            

              
            </div>
        </div>
    );
};

export default NoticeDetail;
