import React, { useState } from 'react';
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
import AdminBoardPage from '../6_admin/admin_board/AdminBoardPage';
import { useEffect } from 'react';
import axios from 'axios';
import AdminCareProject from '../6_admin/AdminCareProject';


const BasicPage = ({removeLoginToken}) =>{

  const [project, setProject] = useState("");
 
  // "프로젝트 리스트" 페이지에서 crousel의 모양을 잡기 위해서는 프로젝트 갯수가 필요했다. 
  // "HomePage" 컴포넌트에서 받아오는 프로젝트 갯수를 
  // "ProjectList" 컴포넌트로 넘기기 위한 state
  
  return(  
    <div className={styles.wholeContainer}>
      <Title/>
      <div className={styles.contentContainer}>
        <LeftNavBar 
          removeLoginToken={()=>removeLoginToken()}              
        />
        <div className={styles.body}>
          <Switch>
            <Route path="/main/home"><HomePage setProject={setProject}/></Route>
            <Route path="/main/projectList"><ProjectListPage project={project}/></Route>
            <Route path="/main/Project/:id"><ProjectPage/></Route>
            <Route path="/main/myPage"><MyPagePage/></Route>
            <Route path="/main/board"><BoardPage/></Route>
            <Route path="/main/mail"> <MailPage/></Route>
            <Route path="/main/admin/project"><AdminProjectPage/></Route>
            <Route
                path="/main/admin/editProject/:id"
                render={props => {
                    return (
                        <AdminEditProject
                            {...props}
                        ></AdminEditProject>
                    );
                }}
            ></Route>
            <Route
                path="/main/admin/editProjectDetails/:id"
                render={props => {
                    return (
                        <AdminCareProject
                            {...props}
                        ></AdminCareProject>
                    );
                }}
            ></Route>
            <Route path="/main/admin/board"><AdminBoardPage/></Route>
          </Switch>
        </div>
      </div>
    </div>
   
  );
};

export default BasicPage;