import React from 'react';
import styles from './BasicPage.module.css';
import LeftNavBar from '../../common/components/LeftNavBar.jsx';
import Title from '../../common/components/Title.jsx';
import HomePage from './home_components/HomePage.jsx';

import { BrowserRouter, Switch,Route } from 'react-router-dom';
import ProjectListPage from '../2_project/ProjectListPage';
import Project from '../../common/components/Project';
import ProjectPage from '../2_project/ProjectPage';


const BasicPage = (props) =>{
  
  return(
  
    <div className={styles.wholeContainer}>
      <Title/>
      <div className={styles.contentContainer}>
        <LeftNavBar/>
        <div className={styles.body}>
          <Switch>
            <Route path="/main/home"><HomePage/></Route>
            <Route path="/main/projectList"><ProjectListPage/></Route>
            <Route path="/main/Project"><ProjectPage/></Route>
          </Switch>
        </div>
      </div>
    </div>
   
  );
};

export default BasicPage;