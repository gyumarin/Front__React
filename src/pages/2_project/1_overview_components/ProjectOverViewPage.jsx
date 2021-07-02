import React from 'react';
import LeftOverView from './LeftOverView';
import RightOverView from './RightOverView';
import styles from './ProjectOverViewPage.module.css';

const ProjectOverViewPage = ({projectID}) => {

    return(
        <div className={styles.container}>
            <LeftOverView projectID = {projectID}/>
            <RightOverView projectID = {projectID}/>
        </div>

    );
};

export default ProjectOverViewPage;