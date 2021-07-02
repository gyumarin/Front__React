import React from 'react';
import {Switch, Route} from 'react-router-dom';

import BoardTopNavBar from './BoardTopNavBar';
import NoticeRoute from './board_component/NoticeRoute';    
import QnaRoute from './board_component/QnaRoute';
import QnaDetail from './board_component/QnaDetail';
import QuestionInsert from './board_component/QuestionInsert';
import NoticeDetail from './board_component/NoticeDetail';
import CompanyTree from './board_component/CompanyTree';

import styles from "./BoardPage.module.css";
import QnaUpdate from './board_component/QnaUpdate';

const BoardPage = (props) => {
    return(
        <div  className={styles.container}>
            <div className={styles.header}>
               <BoardTopNavBar/> 
            </div>
            <div className={styles.content}>
                <Switch>
                    {/* 1. 공지사항 */}
                    <Route exact path="/main/board/notice">
                        <NoticeRoute/>
                    </Route>

                     {/* 1-1. 공지사항 Detail */}
                     <Route
                        path="/main/board/notice/detail/:id"
                        render={props => {return <NoticeDetail {...props}></NoticeDetail>;}}
                    ></Route>

                    {/* 2. QnA */}
                    <Route exact path="/main/board/qna">
                        <QnaRoute/>
                    </Route>

                     {/* 2-1. QnA Detail */}
                     <Route
                        path="/main/board/qna/detail/:id"
                        render={props => { return <QnaDetail {...props}></QnaDetail>;}}
                    ></Route>

                    {/* 2-2. QnA insert */}
                    <Route
                        path="/main/board/qna/insert"
                        render={props => {
                            return <QuestionInsert {...props}></QuestionInsert>;
                        }}
                    ></Route>
                    <Route
                        path="/main/board/qna/update/:id"
                        render={props => {
                            return <QnaUpdate {...props}></QnaUpdate>;
                        }}
                    ></Route>

                    {/* 3. 조직도 */}
                    <Route 
                        path="/main/board/CompanyTree">
                        <CompanyTree/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default BoardPage;