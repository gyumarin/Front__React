import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { StyleRoot } from 'radium';
import styles from  './ProjectPageList.module.css';
import Coverflow from 'react-coverflow';
import BigCard from './1_overview_components/BigCard';

const ProjectListPage = ({project}) => {

    const [projectList, setProjectList] = useState(project);
    const [allProjectList, setAllProjectList] = useState(project);
    const [toggle, setToggle] = useState(false);


    useEffect( async () => {
        const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);
        const result = await axios.get(`/project/list?token=${tmp}`);
        await setAllProjectList(result.data.result);
        await setProjectList(result.data.result.filter(e => e.p_complete == false));
        await setToggle(true);
    }, [])

    const getUndoneProject = async () => {
        let copy = allProjectList.filter(e => e.p_complete == false);
        await setProjectList(copy);
        await setToggle(false);
        await setToggle(true);
    };

    const getDoneProject = async () => {
        let copy = allProjectList.filter(e => e.p_complete == true);
        await setProjectList(copy); 
        await setToggle(false);
        await setToggle(true);
    };


    return(
        <div className={styles.container}>
            <div className={styles.header}>
               <div className={styles.title}>프로젝트 목록</div>
               <span className={styles.count}>{projectList.length}개</span>

               <div className={styles.buttons}>
                    <button className={styles.buttonPlaying} onClick={getUndoneProject}>진행 중 프로젝트</button>
                    <button className={styles.buttonComplete} onClick={getDoneProject}>완료한 프로젝트</button>
                </div>
            </div>

            <div className={styles.carousel}>
            {
                toggle&&projectList.length!=0&&                
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
                                    count = {project.user_count}                                    
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

