import React from 'react';
import {Card, Button} from 'react-bootstrap';
import styles from './BigCard.module.css';

const BigCard = (props) => {
    return(
    <Card className = {styles.card}>      
        <Card.Body className = {styles.body}>
            <Card.Title className = {styles.title}>{`Project ${props.id}`}</Card.Title>
            <Card.Text className = {styles.text}>{props.title}</Card.Text>
            <Card.Text className = {styles.date}>{`${props.start} ~ ${props.end}`}</Card.Text>     
            <Card.Text className={styles.cardContent}>인원 : 8명</Card.Text>  
            <Card.Text className={styles.cardContent}>프로젝트 내용 : 궁금해 궁금해 궁금해</Card.Text>       
            <div className={styles.people}>
            </div> 
        </Card.Body>
        <Button className = {styles.detailButton} variant="primary">상세보기</Button>
    </Card>
    );
};

export default BigCard;