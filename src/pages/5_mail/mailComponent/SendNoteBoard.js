//받은쪽지함
import axios from "axios";
import React from "react";
import SendBoard from "./SendBoard";
import { Link } from "react-router-dom";
import styles from "./SendNoteBoard.module.css";

const SendNoteBoard = ({
    viewList,
    list,
    PaginationBasic,
    deleteList,
    setDeleteList,
    deleteNote,
    checked,
    setChecked,
    search,
    value,
    setValue,
    all,
    read,
    nread,
}) => {
    if (list != null) {
        const onChange = e => {
            setValue(e.target.value);
        };
        return (
            <div className={styles.container}>                
                <div className={styles.buttons}>
                    <div>
                        <button onClick={all} className={styles.filter}>전체</button>
                        <button onClick={read} className={styles.filter}>읽음</button>
                        <button onClick={nread} className={styles.filter}>안읽음</button>|
                        <button className={styles.button}><Link to="/main/mail/write">답장 보내기</Link></button>
                    </div>
                    <div>
                        <input type="text" value={value} onChange={onChange}></input>
                        <button onClick={() => {search();}}>검색</button>
                    </div>
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
                        <SendBoard
                            viewList={viewList}
                            deleteList={deleteList}
                            setDeleteList={setDeleteList}
                            list={list}
                            checked={checked}
                            setChecked={setChecked}
                        ></SendBoard>
                    </div>
                </div>

                <button className={styles.deleteButton} onClick={deleteNote}>삭제</button>
                <div className={styles.pagination}>
                    <PaginationBasic/>
                </div>
            </div>
        );
    }
};

export default SendNoteBoard;

