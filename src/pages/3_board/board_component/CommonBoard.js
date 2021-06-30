import React from "react";
import { Table } from "react-bootstrap";
import NoticeBoard from "./NoticeBoard";
import QnaBoard from "./QnaBoard";
import styles from './CommonBoard.module.css';


const CommonBoard = ({ viewList, list, PaginationBasic, th, keys }) => {
    if (list != null)
        return (
            <div className ={styles.container}>
                <div className={styles.table}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>{th.num}</th>
                                <th>{th.title}</th>
                                <th>{th.writer}</th>
                                <th>{th.date}</th>
                                <th>{th.hits}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keys == "bn_id" ? (
                                <NoticeBoard 
                                    viewList={viewList}
                                ></NoticeBoard>
                            ) : (
                                <QnaBoard viewList={viewList}></QnaBoard>
                            )}
                        </tbody>
                    </Table>
                </div>
                
                <div className  ={styles.pagination}>
                    <PaginationBasic />
                </div>  
            </div>
        );
};

export default CommonBoard;
