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
                        <td className={styles.td}>{value.bn_id}</td>
                        <td className={styles.td}>
                            {
                                isAdmin 
                                ? <Link to={`/main/admin/board/notice/detail/${value.bn_id}`}>{value.bn_title}</Link>
                                : <Link to={`/main/board/notice/detail/${value.bn_id}`}>{value.bn_title}</Link>
                            }                            
                        </td>
                        <td className={styles.td}>{value.e_name}</td>
                        <td className={styles.td}>{value.bn_date}</td>
                        <td className={styles.td}>{value.bn_hits}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default NoticeBoard;
