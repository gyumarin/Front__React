import React from 'react';
import LeftOverView from './LeftOverView';
import RightOverView from './RightOverView';
import styles from './ProjectOverViewPage.module.css';

const ProjectOverViewPage = (props) => {
    return(
        <div className={styles.container}>
            <LeftOverView/>
            <RightOverView/>
        </div>

    );
};

export default ProjectOverViewPage;