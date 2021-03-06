import React from "react";
import axios from "axios";
import { useState } from "react";

import styles from './SearchQna.module.css';

const SearchQna = ({
    setList,
    setViewList,
    setCount,
    setActive,
    listMax,
    setFirstCount,
    setLastCount,
}) => {
    const [keys, setKeys] = useState("title");
    const [values, setValues] = useState("");

    const getList = async (event) => {
        event.preventDefault();
        const result = await axios.get(
            "/board/qna/search?key=" + keys + "&value=" + values
        );
        await sortList(result.data.result);
        let c = parseInt(result.data.result.length / listMax);
        if (result.data.result.length % listMax != 0) {
            c++;
        }
        if (c < 5) {
            setFirstCount(1);
            setLastCount(c);
        } else {
            setFirstCount(1);
            setLastCount(5);
        }
        setActive(1);
        setCount(c);
        setValues('');
    };

    const sortList = viewList => {
        let sList = [];
        viewList.map((value, key) => {
            if (value.board_qna_bq_id == 0) {
                sList.push(value);
                viewList.map((value2, key) => {
                    if (value2.board_qna_bq_id == value.bq_id) {
                        sList.push(value2);
                    }
                });
            }
        });
        setList(sList);
        setViewList(sList.slice(0, listMax));
    };

    const onChange = e => {
        setValues(e.target.value);
    };

    const onChange2 = e => {
        setKeys(e.target.value);
        console.log(e.target.value);
    };

    return (
        <form className={styles.container} onSubmit={getList}>
            <select 
                className={styles.select}
                value={keys} 
                onChange={onChange2}>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
            </select>

            <input 
                className={styles.input}
                onChange={onChange} 
                value={values}
                placeholder="검색어를 입력하세요">
            </input>

            <button 
                className={styles.button}
                onClick={getList}> 
                 <i className="fas fa-search"></i>
            </button>
        </form>
    );
};

export default SearchQna;
