import React from "react";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoticeBoard = ({ isAdmin , viewList }) => {
    

    return (
        <>
            {viewList.map((value, key) => {
                return (
                    <tr key={key}>
                        <td>{value.bn_id}</td>
                        <td>
                            {
                                isAdmin 
                                ? <Link to={`/main/admin/board/notice/detail/${value.bn_id}`}>{value.bn_title}</Link>
                                : <Link to={`/main/board/notice/detail/${value.bn_id}`}>{value.bn_title}</Link>
                            }                            
                        </td>
                        <td>{value.e_name}</td>
                        <td>{value.bn_date}</td>
                        <td>{value.bn_hits}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default NoticeBoard;
