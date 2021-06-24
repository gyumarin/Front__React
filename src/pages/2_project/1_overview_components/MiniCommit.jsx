import React from 'react';
import styles from './MiniCommit.module.css';
import {ListGroup, } from 'react-bootstrap';
import mockData from '../../../Data/data';



const MiniCommit = (props) => {
    return(
        <div className={styles.container}>      
            <div className={styles.title}>Commit List</div>
            <ListGroup className={styles.notices}>{
                mockData.commits.map(commit =>{
                return (
                    <ListGroup.Item className={styles.notice} variant="info">
                    <div >
                        <div className={styles.detail1}>{`${commit.c_comment}`}</div>
                        {/* <div className={styles.detail2}>{`[${commit.p_id}] ${commit.c_man} ㅣ ${commit.wl_date_start} ㅣ${commit. wl_work_detail}` }</div> */}
                    </div>
                    </ListGroup.Item>);
                })}                
            </ListGroup>
      </div>
    );
}

export default MiniCommit;