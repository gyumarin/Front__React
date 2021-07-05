import React,{useEffect, useState} from 'react';
import styles from './ProjectPage.module.css';

import ProjectTopNavBar from './1_overview_components/ProjectTopNavBar';
import ProjectOverViewPage from './1_overview_components/ProjectOverViewPage';

// import { Route } from 'react-router';
import WorkCalendarPage from  './2_workCalendar_components/WorkCalendarPage';
import WorkListPage from './3_workList_components/WorkListPage';
import PeopleListPage from './4_people_components/PeopleListPage';
import CommitListPage from './5_commit_components/CommitListPage';
import { Route, Switch, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
const ProjectPage = () => {

    const [projectInfo, setProjectInfo] = useState([])
    const [param, setParam] = useState(0)
    const history = useHistory();
    const p = useParams();
    
    useEffect(async () => {
        await setParam(p.id);
        if(param!=null){
            // await history.push(`/main/project/${param}`);
        }
        await axios.get(`/project/detail/${param}`).then(res =>{
            setProjectInfo(res.data.result)
            // console.log(res.data.result.p_title)
            
        })
    }, [param])

   

    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ProjectTopNavBar projectID ={param}/>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route exact path={`/main/project/${param}`}><ProjectOverViewPage projectID={param}/> </Route>
                    <Route path={`/main/project/${param}/calendar`}><WorkCalendarPage projectID={param}/> </Route>
                    <Route path={`/main/project/${param}/workList`}><WorkListPage projectID={param}/> </Route>
                    <Route path={`/main/project/${param}/teamList`}><PeopleListPage projectID={param}/> </Route>
                    <Route path={`/main/project/${param}/commitList`}>
                        <CommitListPage projectID ={param} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default ProjectPage;

           