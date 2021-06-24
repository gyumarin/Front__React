import React from 'react';
import styles from './ProjectPage.module.css';

import ProjectTopNavBar from './1_overview_components/ProjectTopNavBar';
import ProjectOverViewPage from './1_overview_components/ProjectOverViewPage';

// import { Route } from 'react-router';
import WorkCalendarPage from  './2_workCalendar_components/WorkCalendarPage';
import WorkListPage from './3_workList_components/WorkListPage';
import PeopleListPage from './4_people_components/PeopleListPage';
import CommitListPage from './5_commit_components/CommitListPage';
import { Route, Switch } from 'react-router-dom';

const ProjectPage = (props) => {

    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ProjectTopNavBar/>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route path="/main/project/overview"><ProjectOverViewPage/></Route>
                    <Route path="/main/project/calendar"><WorkCalendarPage/> </Route>
                    <Route path="/main/project/workList"><WorkListPage/> </Route>
                    <Route path="/main/project/teamList"><PeopleListPage/> </Route>
                    <Route path="/main/project/commitList"><CommitListPage/></Route>
                </Switch>
            </div>
        </div>
    );
};

export default ProjectPage;