import React,{useEffect, useState} from 'react';
import styles from './MiniCommit.module.css';
import {ListGroup, } from 'react-bootstrap';
import mockData from '../../../Data/data';
import axios from 'axios';


const MiniCommit = ({projectID}) => {

    const [commitList, setCommitList] = useState([])
    
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/commit/team?p_id=${projectID}`).then(res =>{
            setCommitList(res.data.result)
        })
    }, [])

    return(
        <div className={styles.container}>      
            <div className={styles.title}>Commit List</div>
            {commitList.length==0?
             <ListGroup className={styles.notices}>
                <div style={{textAlign:'center',paddingLeft:'10px',
                    height:'250px',width : '440px',fontSize:'15px', paddingTop:'50px',
                    paddingBottom:'40px',fontWeight:'bold', fontFamily:"Noto Sans", borderRadius:'10px'}} >
                    <span><i style={{fontSize:'90px',color :'#0d6efd',marginBottom:'10px'}} className="fab fa-github" ></i></span>
                    <span><i style={{fontSize:'60px',color :'#0d6efd',marginBottom:'50px'}} className="far fa-comment-dots" ></i></span>
                    <p>커밋 코멘트가 없습니다.</p>
                </div>
            </ListGroup>
            :
            <ListGroup className={styles.notices}>{
                commitList.map(commit =>{
                    return (                        
                        <ListGroup.Item key = {commit.cl_id} className={styles.notice} variant="info">
                            <div>                                
                                <div className={styles.detail1}>comment : {`${commit.cl_comment}`}</div>
                                <div className={styles.detail2}>committer : {commit.e_nickname}({commit.e_name})</div>
                            </div>
                        </ListGroup.Item>                        
                        )
                })}                
            </ListGroup>
            }
      </div>
    );
}

export default MiniCommit;