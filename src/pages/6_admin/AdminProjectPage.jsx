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

    useEffect(() => {
        getProject();
    }, []);

    const getProject = async () => {
        const result = await axios.get("/project/list?token=" + tmp);
        setProjects(result.data.result);
    };

    const [projects, setProjects] = useState([]);

    const createProject = project => {
        const copy = [...projects];
        copy.push(project);
        setProjects(projects => copy);
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>프로젝트 관리</div>
            </div>

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
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AdminProjectPage;
