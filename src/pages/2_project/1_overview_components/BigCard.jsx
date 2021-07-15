import React from 'react';
import {Card, Button} from 'react-bootstrap';
import styles from './BigCard.module.css';
import Doughnut3 from './Doughnut3';
import {Link} from  'react-router-dom';

const BigCard = (props) => {    
    return(
    <Card className = {styles.card}>      
        <Card.Body className = {styles.body}>
            <Card.Title className = {styles.title}>{`Project ${props.id}`}</Card.Title>
            <Card.Text className = {styles.text}>{props.title}</Card.Text>
            <Card.Text className = {styles.date}>{`${props.start} ~ ${props.end}`}</Card.Text>     
            <Card.Text className={styles.cardContent}>프로젝트 참여 인원 : {props.count} 명</Card.Text>  
            {/* <Card.Text className={styles.cardContent}>프로젝트 내용 : 이거 우째 할거요?</Card.Text>        */}
            <div className={styles.chart}>
                <Doughnut3 projectID = {props.id} />
            </div> 
        </Card.Body>
        <Link to={`/main/project/${props.id}`}><Button className = {styles.detailButton} variant="primary">상세보기</Button></Link>
    </Card>
    );
};

export default BigCard;