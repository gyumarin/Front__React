import React from "react";
import AdminProject from "./AdminProject";
import styles from "./AdminProjectPage.module.css";
import mockData from "../../Data/data";
import AdminAddProject from "./AdminAddProject";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AdminProjectPage = props => {
    const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);

    const [com, setCom] = useState(false);

    useEffect(() => {
        getProject();
    }, []);

    const getProject = async () => {
        const result = await axios.get("/project/list?token=" + tmp);
        setAllProjects(result.data.result);
        let copy = result.data.result.filter(e => e.p_complete == false);
        setProjects(copy);
    };

    const getUndoneProject = async () => {
        let copy = allProjects.filter(e => e.p_complete == false);
        setProjects(copy);
        setCom(false);
    };

    const getDoneProject = async () => {
        let copy = allProjects.filter(e => e.p_complete == true);
        setProjects(copy);
        setCom(true);
    };

    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);

    const createProject = project => {
        const copy = [...allProjects];
        copy.push(project);
        setAllProjects(copy);
        const copy2 = [...projects];
        copy2.push(project);
        setProjects(copy2);
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>프로젝트 관리</div>
            </div>
            <button onClick={getUndoneProject}>진행중</button>
            <button onClick={getDoneProject}>완료</button>
            <div className={styles.contents}>
                <AdminAddProject
                    projects={projects}
                    createProject={createProject}
                />
                {projects.map(proj => {
                    return (
                        <AdminProject
                            id={proj.p_id}
                            key={proj.p_id}
                            title={proj.p_title}
                            start={proj.p_date_start}
                            end={proj.p_date_end}
                            total={proj.p_Totalpersent}
                            success={proj.p_success}
                            projects={projects}
                            allProjects={allProjects}
                            setProjects={setProjects}
                            setAllProjects={setAllProjects}
                            com={com}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AdminProjectPage;
