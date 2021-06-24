import React from 'react';
import mockData from '../../Data/data';
import styles from  './ProjectPageList.module.css';
import {Carousel} from 'react-bootstrap';
import BigCard from './1_overview_components/BigCard';

const ProjectListPage = (props) => {
    const projects = mockData.project;

    return(
        <div className={styles.container}>

            <div className={styles.header}>
               <div className={styles.title}>진행중인 프로젝트</div>
               <span className={styles.count}>{projects.length}개</span>
            </div> 

            <div className={styles.carousel}>
                <Carousel className={styles.carousel}>                    
                   {
                       projects.map((project)=>{
                           return(
                            <Carousel.Item interval={2000}>
                                <BigCard 
                                    id ={project.p_id}
                                    key = {project.p_id}
                                    title = {project.p_title}
                                    start = {project.p_date_start}
                                    end = {project.p_date_end}
                                    total = {project.p_Totalpersent}
                                    success = {project.p_success}
                                    className="d-block w-100"
                                    src="holder.js/800x400?text=First slide&bg=373940"
                                    alt="First slide"
                                />                                
                            </Carousel.Item>
                           )                        
                       })
                   }   
                </Carousel>
            </div>

        </div>
    );
};

export default ProjectListPage;