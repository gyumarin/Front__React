//보낸 쪽지함
import React from "react";
import styles from "./PostBoard.module.css";
import { Link } from "react-router-dom";

const PostBoard = ({
    viewList,
    list,
    PaginationBasic,
    deleteList,
    setDeleteList,
    checked,
    setChecked,
}) => {
    const checkDeleteList = (value, checked) => {
        if (checked) {
            deleteList.push(value);
            setDeleteList(deleteList);
        } else {
            let copy = deleteList.filter(e => e !== value);
            setDeleteList(copy);
        }
    };

    const checkHandler = ({ target }, key) => {
        checkDeleteList(target.value, target.checked);
        let copy = [...checked];
        copy[key] = !copy[key];
        setChecked(copy);
    };

    return (
        <>
            {viewList.map((value, key) => {
                return (
                    <div className={styles.container} key={key}>
                        <div className={styles.content1}>-</div>
                        {value.n_done ? <div className={styles.content2}>읽음</div> :<div className={styles.content2}>안읽음</div>}
                        <div className={styles.content3}>
                            <Link to={`/main/mail/detail/` + value.n_id} style={{ textDecoration: 'none', color: '#007bbc' }}>
                                {value.n_title}
                            </Link>
                        </div>
                        <div className={styles.content4}>{value.e_name}</div>
                        <div className={styles.content5}>{value.n_date}</div>
                        <div className={styles.content6}>
                            <input
                                type="checkbox"
                                value={value.n_id}
                                onChange={e => checkHandler(e, key)}
                                checked={checked[key] ? true : false}
                            ></input>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PostBoard;
