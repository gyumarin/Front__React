//보낸쪽지함
import React from "react";
import PostBoard from "./PostBoard";
import { Link } from "react-router-dom";
import styles from "./PostNoteBoard.module.css";
import axios from "axios";

const PostNoteBoard = ({
    viewList,
    list,
    PaginationBasic,
    deleteList,
    setDeleteList,
    deleteNote,
    checked,
    setChecked,
}) => {
    if (list != null) {
        return (
            <div className={styles.container}>   
                <div className={styles.buttons}>
                    <button className={styles.filter}>전체</button>
                    <button className={styles.filter}>읽음</button>
                    <button className={styles.filter}>안읽음</button>|
                    <button className={styles.button}><Link to="/main/mail/write">쪽지 보내기</Link></button>
                </div>

                <div className={styles.table}>
                    <div className={styles.header}> 
                        <div className={styles.category1}>번호</div>
                        <div className={styles.category2}>읽음</div>
                        <div className={styles.category3}>제목</div>
                        <div className={styles.category4}>보낸 사람</div>
                        <div className={styles.category5}>일자</div>
                        <div className={styles.category6}>선택</div>   
                    </div>

                    <div className={styles.contens}>
                        <PostBoard
                            viewList={viewList}
                            deleteList={deleteList}
                            setDeleteList={setDeleteList}
                            list={list}
                            checked={checked}
                            setChecked={setChecked}
                        ></PostBoard>
                    </div>
                </div>

                <button  className={styles.deleteButton}  onClick={deleteNote}>삭제</button>
                <div className={styles.pagination}>
                    <PaginationBasic />
                </div>
            </div>
        );
    }
};

export default PostNoteBoard;
