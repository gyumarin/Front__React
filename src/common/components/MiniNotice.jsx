import React from 'react';
import styles from './MiniNotice.module.css';
import {ListGroup, } from 'react-bootstrap';
import mockData from '../../Data/data';

const MiniNotice = (props) => {
  return(
    <div className={styles.container}>      
      <div className={styles.title}>공지사항</div>
      
      <ListGroup className={styles.notices}>{
          mockData.notice.map(notice =>{
            return (
              <ListGroup.Item className={styles.notice} variant="info">
                <div >
                  <span className={styles.noticeContent}>[공지] {notice.bn_title}</span>
                </div>
              </ListGroup.Item>);
          })}                
      </ListGroup>
    </div>
  );
};

export default MiniNotice;