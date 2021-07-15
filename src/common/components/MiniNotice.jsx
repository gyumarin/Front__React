import React from 'react';
import styles from './MiniNotice.module.css';
import {ListGroup, } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MiniNotice = (props) => {
  const history = useHistory(); 
  const [noticeList, setNoticeList] = useState([])
  useEffect(() => {
      // const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
      axios.get('/board/notice/limit').then(res=>{
        setNoticeList(res.data.result);        
      })
  }, []);

  const goNotice =(id)=>{
    history.push(`/main/board/notice/detail/${id}`);
  }

  return(
    <div className={styles.container}>      
      <div className={styles.title}>공지사항</div>
      
      <ListGroup className={styles.notices}>{
          noticeList.map(notice =>{
            return (
              <ListGroup.Item key={notice.bn_id} className={styles.notice} variant="info" onClick ={()=>{goNotice(notice.bn_id)}} >
                <span className={styles.noticeContent}>[공지] {notice.bn_title}</span>                
              </ListGroup.Item>);
          })}                
      </ListGroup>
    </div>
  );
};

export default MiniNotice;