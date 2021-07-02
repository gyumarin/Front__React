import React,{useEffect, useState} from 'react';
import styles from './MiniCommit.module.css';
import {ListGroup, } from 'react-bootstrap';
import mockData from '../../../Data/data';
import axios from 'axios';


const MiniCommit = ({ projectID}) => {

    const [commitList, setCommitList] = useState([])
    
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/commit/person?p_id=${projectID}&token=${tmp}`).then(res =>{
            setCommitList(res.data.result)
            
        })
    }, [])

    return(
        <div className={styles.container}>      
            <div className={styles.title}>Commit List</div>
            <ListGroup className={styles.notices}>{
                commitList.map(commit =>{
                    if(commit.cl_comment!==""){
                        return (
                            <ListGroup.Item className={styles.notice} variant="info">
                            <div >
                                <div className={styles.detail1}>{`${commit.cl_comment}`}</div>
                            </div>
                            </ListGroup.Item>);
                    }
               
                })}                
            </ListGroup>
      </div>
    );
}

export default MiniCommit;