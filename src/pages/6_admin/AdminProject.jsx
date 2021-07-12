import React, { useState } from "react";
import styles from "./AdminProject.module.css";
import { Card, Button } from "react-bootstrap";
import DoughnutChart from "../../common/components/Doughnut";
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteTeamPopUp from './DeleteTeamPopUp';

const AdminProject = props => {

    const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);
    const [delSet, setDelSet] = useState(false);

    const complete = () => {
        const result = axios.put("/project/complete/" + props.id);
        const copy = props.allProjects.map(value =>
            value.p_id === props.id
                ? { ...value, p_complete: !value.p_complete }
                : value
        );
        props.setAllProjects(copy);
        let copy2 = copy.filter(e => e.p_complete == false);
        props.setProjects(copy2);
    };

    const incomplete = () => {
        const result = axios.put("/project/incomplete/" + props.id);
        const copy = props.allProjects.map(value =>
            value.p_id === props.id
                ? { ...value, p_complete: !value.p_complete }
                : value
        );
        props.setAllProjects(copy);
        let copy2 = copy.filter(e => e.p_complete == true);
        props.setProjects(copy2);
    };

    const projectDelete = pwd => {
        const result = axios
            .delete(
                "/project/delete?token=" +
                    tmp +
                    "&p_id=" +
                    props.id +
                    "&pwd=" +
                    pwd
            )
            .then(res => {
                if (res.data.code == 200) {
                    let copy = props.allProjects.filter(
                        e => e.p_id != props.id
                    );
                    props.setAllProjects(copy);
                    if (props.com) {
                        let copy2 = copy.filter(e => e.p_complete == true);
                        props.setProjects(copy2);
                    } else {
                        let copy2 = copy.filter(e => e.p_complete == false);
                        props.setProjects(copy2);
                    }
                } else {
                    alert("비밀번호가 틀렸습니다.");
                }
            });
    };

    const projectDeletePopUp = () => {
        setDelSet(true);
    };


    return (
        <>
        <Card className={styles.card}>
            <Card.Body className={styles.body}>
                <Card.Title
                    className={styles.title}
                >{`Project ${props.id}`}</Card.Title>
                <Card.Text className={styles.text}>{props.title}</Card.Text>
                <Card.Text
                    className={styles.date}
                >{`${props.start} ~ ${props.end}`}</Card.Text>
            </Card.Body>

            <Card.Body className={styles.chart}>
                <DoughnutChart  projectID = {props.id}/>
            </Card.Body>
            <div className={styles.buttons}  >
                <button className={styles.complete} onClick={complete}>완료</button>
                {/* <button onClick={incomplete}>미완료</button> */}
                <button className={styles.delete} onClick={projectDeletePopUp}>삭제</button>
            </div>
            <Link
                className={styles.detailButton}
                to={`/main/admin/editProject/${props.id}`}
            >
                <Button className={styles.detailButton} variant="primary">
                    프로젝트 관리
                </Button>
            </Link>            
        </Card>
        {delSet ? (
            <DeleteTeamPopUp
                delSet={delSet}
                setDelSet={setDelSet}
                title={props.title}
                projectDelete={projectDelete}
            ></DeleteTeamPopUp>
        ) : null}
        
        </>
    );
};

export default AdminProject;
