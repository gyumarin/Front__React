import React from "react";
import { Link } from "react-router-dom";
import styles from "./QnaBoard.module.css";

const QnaBoard = ({ viewList, isAdmin }) => {
    return (
        <>
            {viewList.map((value, key) => {
                return (
                    <tr key={key} className={styles.tr}>
                        {value.board_qna_bq_id == 0 ? (
                            <td className={styles.td1}>{value.bq_id}</td>
                        ) : (
                            <td className={styles.td1}><div className={styles.replyArrow}><i className="fas fa-reply"></i></div></td>
                        )}
                        <td className={styles.td2}>
                            {
                                isAdmin
                                ? <Link to={`/main/admin/board/qna/detail/${value.bq_id}`} style={{ textDecoration: 'none', color: '#007bbc' }}>{value.bq_title}</Link> 
                                : <Link to={`/main/board/qna/detail/${value.bq_id}`} style={{ textDecoration: 'none', color: '#007bbc' }}>{value.bq_title}</Link>
                            }
                            
                        </td>
                        <td className={styles.td3}>{value.e_name}</td>
                        <td className={styles.td4}>{value.bq_date}</td>
                        <td className={styles.td5}>
                            <span className={styles.hit}><i className="fas fa-eye"></i></span>
                            {value.bq_hits}
                        </td>
                    </tr>
                );
            })}
        </>
    );
};
export default QnaBoard;
