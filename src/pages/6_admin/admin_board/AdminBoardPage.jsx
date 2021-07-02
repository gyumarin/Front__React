import React from 'react';
import styles from './AdminBoardPage.module.css';
import AdminBoardTopNavBar from './AdminBoardTopNavBar';
import { Switch, Route } from 'react-router-dom';

import NoticeRoute from "../../3_board/board_component/NoticeRoute";
import NoticeDetail from "../../3_board/board_component/NoticeDetail";
import QnaRoute from "../../3_board/board_component/QnaRoute";
import QnaDetail from "../../3_board/board_component/QnaDetail";
import NoticeInsert from '../../3_board/board_component/NoticeInsert';
import AnswerInsert from '../../3_board/board_component/AnswerInsert';
import QnaUpdate from "../../3_board/board_component/QnaUpdate";
import NoticeUpdate from "../../3_board/board_component/NoticeUpdate";

const AdminBoardPage = (props) => {
    return(
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}> 
                <AdminBoardTopNavBar/>
            </div>
            <div className={styles.content}>
                <Switch>                       
                    {/* 1. 공지사항 */}
                    <Route exact path="/main/admin/board/notice">
                        <NoticeRoute/>
                    </Route>

                     {/* 1-1. 공지사항 Detail */}
                     <Route
                        path="/main/admin/board/notice/detail/:id"
                        render={props => {return <NoticeDetail {...props}></NoticeDetail>;}}
                    ></Route>

                    {/* 1-2. 공지등록  */}
                   
                    <Route
                        path="/main/admin/board/notice/insert"
                        render={props => {
                            return <NoticeInsert {...props}></NoticeInsert>;
                        }}
                    ></Route>

                    {/* 1_3. 공지 수정 */}
                    <Route
                        path="/main/admin/board/notice/update/:id"
                        render={props => {
                            return <NoticeUpdate {...props}></NoticeUpdate>;
                        }}
                    ></Route>

                    {/* 2. QnA */}
                    <Route exact path="/main/admin/board/qna">
                        <QnaRoute/>
                    </Route>

                     {/* 2-1. QnA Detail */}
                     <Route
                        path="/main/admin/board/qna/detail/:id"
                        render={props => { return <QnaDetail {...props}></QnaDetail>;}}
                    ></Route>
                    {/* 2-2. QnA 답변 달기 */}
                    <Route
                        path="/main/admin/board/qna/insert/:id"
                        render={props => {
                            return <AnswerInsert {...props}></AnswerInsert>;
                        }}>
                    </Route>
                    {/* 2_3. QnA 수정 */}
                    <Route
                        path="/main/admin/board/qna/update/:id"
                        render={props => {
                            return <QnaUpdate {...props}></QnaUpdate>;
                        }}
                    ></Route>
                </Switch>
            </div>
        </div>
    );
}

export default AdminBoardPage;