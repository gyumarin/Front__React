import React, { useState } from 'react';
import styles from './MailPage.module.css';
import { Switch, Route, useParams, } from 'react-router-dom';

import MailTopNavBar from './MailTopNavBar';
import PostRoute from './mailComponent/PostRoute';
import SendRoute from './mailComponent/SendRoute';
import NoteInsert from './mailComponent/NoteInsert';
import NoteDetail from './mailComponent/NoteDetail';

const MailPage = (props) => {

    const [id, setId] =useState();    
    
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <MailTopNavBar id = {id}/>
            </div>
            <div className={styles.content}>
                <Switch> 
                    <Route 
                        path="/main/mail/post/:id" 
                        render={props => {return <PostRoute {...props}></PostRoute>;}}>
                    </Route>
                    <Route
                        path="/main/mail/send/:id"
                        render={props => {
                            return <SendRoute {...props} setId={setId}></SendRoute>;
                        }}
                    ></Route>
                    <Route
                        path="/main/mail/write"
                        render={props => {
                            return <NoteInsert {...props}></NoteInsert>;
                        }}
                    ></Route>
                    <Route
                        path="/main/mail/detail/:id"
                        render={props => {
                            return <NoteDetail {...props}></NoteDetail>;
                        }}
                    ></Route>
                </Switch>
            </div>
        </div>
    );
};      

export default MailPage;     
                    

                    