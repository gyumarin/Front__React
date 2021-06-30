import React from 'react';
import styles from './BasicPage.module.css';
import LeftNavBar from '../../common/components/LeftNavBar.jsx';
import Title from '../../common/components/Title.jsx';
import HomePage from './home_components/HomePage.jsx';

import { BrowserRouter, Switch,Route } from 'react-router-dom';
import ProjectListPage from '../2_project/ProjectListPage';
import ProjectPage from '../2_project/ProjectPage';
import MyPagePage from '../4_myPage/MyPagePage';
import BoardPage from '../3_board/BoardPage';
import AdminProjectPage from '../6_admin/AdminProjectPage';
import AdminEditProject from '../6_admin/AdminEditProject';
import MailPage from '../5_mail/MailPage';


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
            <Route path="/main/myPage"><MyPagePage/></Route>
            <Route path="/main/board"><BoardPage/></Route>
            <Route path="/main/mail"> <MailPage/></Route>
            <Route path="/main/admin/project"><AdminProjectPage/></Route>
            <Route path="/main/admin/editProject"><AdminEditProject/></Route>
          </Switch>
        </div>
      </div>
    </div>
   
  );
};

export default BasicPage;