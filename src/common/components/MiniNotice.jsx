import React from 'react';
import styles from './MiniNotice.module.css';
import {ListGroup, } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import axios from 'axios';

const MiniNotice = (props) => {
  const [noticeList, setNoticeList] = useState([])
  useEffect(() => {
      const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
      axios.get('/board/notice/list').then(res=>{
        setNoticeList(res.data.result)        
      })
  }, []);

  return(
    <div className={styles.container}>      
      <div className={styles.title}>공지사항</div>
      
      <ListGroup className={styles.notices}>{
          noticeList.map(notice =>{
            return (
              <ListGroup.Item className={styles.notice} variant="info">
                <span className={styles.noticeContent}>[공지] {notice.bn_title}</span>                
              </ListGroup.Item>);
          })}                
      </ListGroup>
    </div>
  );
};

export default MiniNotice;