import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from './NoticeDetail.module.css';

import { Link, useHistory } from 'react-router-dom';

const NoticeDetail = ({ match }) => {
    const history = useHistory();
    const isAdmin = history.location.pathname.split("/")[2] == "admin"? true : false;    
    const [detail, setDetail] = useState({});

    const[loginID, setLoginID] = useState(0);
    const[noticeID, setNoticeID]=useState(0);

    useEffect(() => {
        getDetail();        
    }, []);

    useEffect( async () => {
        const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        await axios.get(`/project/list`,
            {headers: {
                'token': tmp
            }}
            ).then(res=>{
               console.log(res.data.result[0].e_id);
               setNoticeID(res.data.result[0].e_id);
            }) ;    
    }, []);

    const getDetail = async () => {
        const result = await axios.get(
            "/board/notice/detail/" + match.params.id
        )
        console.log(result.data.result);
        setLoginID(result.data.result.e_id)

        await setDetail(result.data.result);        
    };



    const goWrite =(e)=>{
        e.preventDefault();
        history.push(`/main/admin/board/notice/update/` + match.params.id);
    }

    const goList=async (e)=>{
        e.preventDefault();
        //15. 공지 사항 삭제 시 팝업
        const check = window.confirm(match.params.id+"번 공지 사항을 삭제 하시겠습니까?")
        if(check){
            axios.delete(`/board/notice/delete/${match.params.id}`);
            history.push(`/main/admin/board/notice/`);
        }
       
    }  
    
    return (
        <div className={styles.container}>
            <div className={isAdmin ? styles.adminTitle : styles.title }>공지사항</div>

            <div className={styles.contContainer}>

                <div className={styles.content}>

                    <div className={styles.header}>    
                        <div className={styles.titleContainer}>         
                            <div className={isAdmin ? styles.adminSignal : styles.signal}>제목 </div>
                            <div className={styles.titleValue}>{detail.bn_title}</div>        

                            <div className={styles.date}>
                                {
                                `  작성 일자 : ${detail.bn_date}  
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
              ? 
              loginID != noticeID ? 
              <>               
                <button className={styles.buttonDel1} onClick={goList}>삭제</button>
              </>
              :
              <>
                <button className={styles.buttonMod} onClick={goWrite}>수정</button> 
                <button className={styles.buttonDel} onClick={goList}>삭제</button>
              </>
              : null
            }             
            </div>
        </div>
    );
};

export default NoticeDetail;
