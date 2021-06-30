import React from 'react';
import styles from './AdminAddProject.module.css';
import { Card, Button } from 'react-bootstrap';
import CreateProjectPopUp from './CreateProjectPopUp';

import { useState } from 'react';

const AdminAddProject = (props) => {
    const [popup, setPopup] = useState(false);
    const onPopUP = (event)=>{
        event.preventDefault();
        setPopup(!popup);        
    }

    return(
        <div>
        <Card className = {styles.card}>      
            <Card.Body className = {styles.body}>
                <Button className = {styles.detailButton} variant="primary" onClick={onPopUP}>
                 <i className="fas fa-plus"></i>
                </Button>
            </Card.Body>            
            
      </Card> 
        {
            popup ? 
            <CreateProjectPopUp
                projects = {props.projects}
                createProject ={props.createProject}
                setPopup = {setPopup}
            /> 
            : null
        }
      </div>
    );
};

export default AdminAddProject;