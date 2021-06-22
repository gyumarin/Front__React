import React from 'react';
import {Card, Button} from 'react-bootstrap';
import styles from './Project.module.css';

const Project = (props) => {
  return(
    <Card className = {styles.card}>      
      <Card.Body className = {styles.body}>
        <Card.Title className = {styles.title}>{`Project ${props.id}`}</Card.Title>
        <Card.Text className = {styles.text}>{props.title}</Card.Text>
        <Card.Text className = {styles.date}>{`${props.start} ~ ${props.end}`}</Card.Text>        
      </Card.Body>

      <Card.Body>
      </Card.Body>

      <Button className = {styles.detailButton} variant="primary">상세보기</Button>
    </Card>
  );
};

export default Project;

