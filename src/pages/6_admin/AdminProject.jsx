import React from "react";
import styles from "./AdminProject.module.css";
import { Card, Button } from "react-bootstrap";
import DoughnutChart from "../../common/components/Doughnut";
import { Link } from "react-router-dom";

const AdminProject = props => {
    return (
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

            <Link
                className={styles.detailButton}
                to={`/main/admin/editProject/${props.id}`}
            >
                <Button className={styles.detailButton} variant="primary">
                    프로젝트 관리
                </Button>
            </Link>
        </Card>
    );
};

export default AdminProject;
