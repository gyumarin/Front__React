import React from "react";
import { Link } from "react-router-dom";

const QnaBoard = ({ viewList, isAdmin }) => {
    return (
        <>
            {viewList.map((value, key) => {
                return (
                    <tr key={key}>
                        {value.board_qna_bq_id == 0 ? (
                            <td>{value.bq_id}</td>
                        ) : (
                            <td></td>
                        )}
                        <td>
                            {
                                isAdmin
                                ? <Link to={`/main/admin/board/qna/detail/${value.bq_id}`}>{value.bq_title}</Link> 
                                : <Link to={`/main/board/qna/detail/${value.bq_id}`}>{value.bq_title}</Link>
                            }
                            
                        </td>
                        <td>{value.e_name}</td>
                        <td>{value.bq_date}</td>
                        <td>{value.bq_hits}</td>
                    </tr>
                );
            })}
        </>
    );
};
export default QnaBoard;
