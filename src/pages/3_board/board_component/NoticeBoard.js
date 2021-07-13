import React from "react";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NoticeBoard.module.css";

const NoticeBoard = ({ isAdmin , viewList }) => {
    

    return (
        <>
            {viewList.map((value, key) => {
                return (
                    <tr key={key} className={styles.tr}>
                        <td className={styles.td1}>{value.bn_id}</td>
                        <td className={styles.td2}>
                            {
                                isAdmin 
                                ? <Link to={`/main/admin/board/notice/detail/${value.bn_id}`} style={{ textDecoration: 'none', color: '#007bbc' }}>{value.bn_title}</Link>
                                : <Link to={`/main/board/notice/detail/${value.bn_id}`} style={{ textDecoration: 'none', color: '#007bbc' }}>{value.bn_title}</Link>
                            }                            
                        </td>
                        <td className={styles.td3}>{value.e_name}</td>
                        <td className={styles.td4}>{value.bn_date}</td>
                        <td className={styles.td5}>
                            <span className={styles.hit}><i className="fas fa-eye"></i></span>
                            {value.bn_hits}
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default NoticeBoard;
