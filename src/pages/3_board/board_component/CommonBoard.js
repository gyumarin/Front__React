import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import NoticeBoard from "./NoticeBoard";
import QnaBoard from "./QnaBoard";
import styles from './CommonBoard.module.css';
import { useHistory } from 'react-router';


const CommonBoard = ({ viewList, list, PaginationBasic, th, keys }) => {
    const history = useHistory();
    const isNotice = history.location.pathname.split("/")[3] == "notice" ? true : false;
    const isAdmin =  history.location.pathname.split("/")[2] == "admin" ? true : false; 

    const onCreateNotice =(event)=>{
        event.preventDefault();
        history.push("/main/admin/board/notice/insert");
    }

    const onCreateQna =(event)=>{
        event.preventDefault();
        history.push("/main/board/qna/insert");
    }

    if (list != null)
        return (
            <div className ={styles.container}>
                <div className={styles.table}>
                    <Table >
                        {/* <thead>
                            <tr>
                                <th>{th.num}</th>
                                <th>{th.title}</th>
                                <th>{th.writer}</th>
                                <th>{th.date}</th>
                                <th>{th.hits}</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {keys == "bn_id" ? (
                                <NoticeBoard 
                                   isAdmin ={isAdmin}
                                   viewList={viewList}
                                ></NoticeBoard>
                            ) : (
                                <QnaBoard 
                                    isAdmin={isAdmin}
                                    viewList={viewList}
                                ></QnaBoard>
                            )}
                        </tbody>
                    </Table>
                </div>
                
                <div className  ={styles.pagination}>
                    <PaginationBasic />                    
                </div>  
                {
                    isAdmin 
                    ? <button className={styles.button} onClick ={onCreateNotice}>공지 등록</button> 
                    : 
                    isNotice 
                    ? null 
                    : <button className={styles.button} onClick ={onCreateQna}>QnA 등록</button>
                }
            </div>
        );
};

export default CommonBoard;
