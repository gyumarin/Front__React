import React from 'react';
import styles from './MyPagePage.module.css';
import {Switch, Route} from 'react-router-dom';

import MyPageCommuteCalendar from './calendar_component/MyPageCommuteCalendar';
import MyPageTopNavBar from './MyPageTopNavBar';
import Profile from './profile_component/Profile';

const MyPagePage = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <MyPageTopNavBar/>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route path="/main/myPage/commute"><MyPageCommuteCalendar/> </Route>
                    <Route path="/main/myPage/profile"><Profile/></Route>                   
                </Switch>
            </div>
        </div>
    );
};

export default MyPagePage;