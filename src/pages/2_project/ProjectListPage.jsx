import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { StyleRoot } from 'radium';
import styles from  './ProjectPageList.module.css';
import Coverflow from 'react-coverflow';
import BigCard from './1_overview_components/BigCard';

const ProjectListPage = ({project}) => {

    const [projectList, setProjectList] = useState(project);

    useEffect(() => {
        const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/list?token=${tmp}`).then(res=>{
            setProjectList(res.data.result)
        })
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.header}>
               <div className={styles.title}>진행중인 프로젝트</div>
               <span className={styles.count}>{projectList.length}개</span>
            </div> 


            <div className={styles.carousel}>
            {
                projectList[0]&&                
                <StyleRoot>
                    <Coverflow                        
                        displayQuantityOfSide={1}
                        navigation
                        infiniteScroll
                        enableHeading
                        media={{
                            '@media (max-width: 900px)': {
                            width: '600px',
                            height: '300px'
                            },
                            '@media (min-width: 900px)': {
                            width: '1650px',
                            height: '700px'
                            }
                        }}
                    >
                    {
                        projectList.map((project)=>{
                            return( 
                                <BigCard
                                    id ={project.p_id}
                                    key = {project.p_id}
                                    title = {project.p_title}
                                    start = {project.p_date_start}
                                    end = {project.p_date_end}
                                    total = {project.p_Totalpersent}
                                    success = {project.p_success}
                                    
                                    // data-action="https://doce.cc/"                                
                                />      
                            )                        
                        })
                    } 
                    </Coverflow>
                </StyleRoot>
            }
            </div>
        </div>
    );
};

export default ProjectListPage;


