import React from 'react';
import {Switch, Route} from 'react-router-dom';

import BoardTopNavBar from './BoardTopNavBar';
import NoticeRoute from './board_component/NoticeRoute';    
import QnaRoute from './board_component/QnaRoute';
import QnaDetail from './board_component/QnaDetail';
import NoticeDetail from './board_component/NoticeDetail';
import CompanyTree from './board_component/CompanyTree';

const BoardPage = (props) => {
    return(
        <div>
            <div>
               <BoardTopNavBar/> 
            </div>
            <div>
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