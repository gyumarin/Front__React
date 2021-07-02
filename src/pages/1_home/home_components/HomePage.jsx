import axios from 'axios';
import React, {useEffect, useState} from 'react';
import CommuteCalender from '../../../common/components/CommuteCalender';
import MiniNotice from '../../../common/components/MiniNotice';
import MiniWorkList from '../../../common/components/MiniWorkList';
import Project from '../../../common/components/Project';
import mockData from '../../../Data/data';
import styles from './HomePage.module.css';



const HomePage = (props) => {

    const projects = mockData.project;

    const [projectList, setProjectList] = useState([])
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/list?token=${tmp}`).then(res=>{
            console.log(res.data.result)
            setProjectList(res.data.result)
        })
    }, []);

    return(
        <div className={styles.body}>
            <div className={styles.leftBody}>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>진행중인 프로젝트</span>    
                    <span className={styles.projectNumber}>{mockData.project.length}</span>  
                </div>
                
                <div className={styles.projectContainer}>
                    {                
                        projectList.map((project)=>{
                        return <Project
                            id ={project.p_id}
                            key = {project.p_id}
                            title = {project.p_title}
                            start = {project.p_date_start}
                            end = {project.p_date_end}                        
                        />
                    })
                    }
                </div>
            </div>

            <div className={styles.rightBody}>
                <div className={styles.calender}>
                    <div>
                    <CommuteCalender/>
                    </div>
                </div>

                <div className={styles.dataList}>
                    <MiniNotice/>
                    <MiniWorkList/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;