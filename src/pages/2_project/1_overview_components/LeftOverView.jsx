import React,{useEffect, useState} from 'react';
import styles from './LeftOverView.module.css';
import MiniCommit from './MiniCommit';
import MiniTeamList from './MiniTeamList';
import axios from 'axios';
const LeftOverView = ({projectID}) => {

    const [projectInfo, setProjectInfo] = useState([])
    
    useEffect(() => {
        axios.get(`/project/detail/${projectID}`).then(res =>{
            setProjectInfo(res.data.result)   
        })
    }, [])


    return(
        <div className={styles.container}>
            <div className={styles.projectInfo}>
                <h3 className={styles.h3}>{projectInfo.p_title}</h3>
                <p className={styles.p}>프로젝트 기간 : {projectInfo.p_date_start} ~{projectInfo.p_date_end}</p>
            </div>

            <div className={styles.lists}>
                <MiniCommit  projectID={projectID}/>
                <MiniTeamList projectID={projectID}/>
            </div>          
        </div> 
    );
};

export default LeftOverView;