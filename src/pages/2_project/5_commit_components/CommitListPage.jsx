import React from 'react';
import { useState, useEffect } from 'react';
import styles from './CommitListPage.module.css';
import CommitTest from './CommitTest';
import axios from 'axios';

const CommitListPage = ({projectID}) => {
    const [projectInfo, setProjectInfo] = useState([]);

    useEffect(()=>{
        axios.get(`/project/detail/${projectID}`).then(res =>{
            setProjectInfo(res.data.result)            
        });
    },[]);

    return(
        
        <div className={styles.container} >
            
            <div style={{marginBottom:'-35px'}}>
                <h3 className={styles.h3}>{projectInfo.p_title}<font style={{marginLeft : '16px' ,fontSize:'18px', color : 'rgba(1, 1, 1, 0.3)'}}>커밋 리스트</font></h3>                
            </div>

            <div className={styles.listContainer} style={{paddingLeft: '40px'}}>
                <CommitTest gitRepo={projectInfo.p_giturl} pmNick = {projectInfo.e_nickname}/>
            </div>
        </div> 
    );
};

export default CommitListPage;