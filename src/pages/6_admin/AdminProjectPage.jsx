import React from 'react';
import AdminProject from './AdminProject';
import styles from "./AdminProjectPage.module.css";
import mockData from '../../Data/data';
import AdminAddProject from './AdminAddProject';

import { useState } from 'react';


const AdminProjectPage = (props) => {

    const [projects,setProjects] = useState([{
        p_id: 1,
        p_title: '부산 정보 산업진흥원 홈페이지 개발',
        p_date_start: '2021-03-11',
        p_date_end: '2021-08-11',
        p_Totalpersent: 100,
        p_success: 28,
    },
    {
        p_id: 2,
        p_title: '부산 정보 산업진흥원 홈페이지 개발',
        p_date_start: '2021-03-11',
        p_date_end: '2021-08-11',
        p_Totalpersent: 100,
        p_success: 28,
    },
    {
        p_id: 3,
        p_title: '부산 정보 산업진흥원 홈페이지 개발',
        p_date_start: '2021-03-11',
        p_date_end: '2021-08-11',
        p_Totalpersent: 100,
        p_success: 28,
    },]);

    const createProject =(project)=>{
        const copy = [...projects];
        copy.push(project);
        setProjects(projects => copy);
    }
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>프로젝트 관리</div>
            </div> 

            <div className={styles.contents}>
                <AdminAddProject 
                    projects = {projects}
                    createProject={createProject}
                />
                {
                    projects.map((proj)=>{
                        return <AdminProject
                        id ={proj.p_id}
                        key = {proj.p_id}
                        title = {proj.p_title}
                        start = {proj.p_date_start}
                        end = {proj.p_date_end}
                        total = {proj.p_Totalpersent}
                        success = {proj.p_success}
                        />
                    })
                }
            </div>            
        </div>

    );
};

export default AdminProjectPage;