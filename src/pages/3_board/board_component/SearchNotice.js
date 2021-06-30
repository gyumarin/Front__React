import React from "react";
import axios from "axios";
import { useState } from "react";

import styles from './SearchNotice.module.css';

const  SearchNotice = ({
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

    const getList = async () => {
        const result = await axios.get(
            "/board/notice/search?key=" + keys + "&value=" + values
        );
        await setList(result.data.result);
        await setViewList(result.data.result.slice(0, listMax));
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
    };

    const onChange = e => {
        setValues(e.target.value);
    };

    const onChange2 = e => {
        setKeys(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className={styles.container}>
            <select 
                className={styles.select}
                value={keys} 
                onChange={onChange2}>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
            </select>
            
            <input 
                onChange={onChange} 
                className={styles.input}
                value={values}
                placeholder="검색어를 입력하세요">
                
            </input>
            
            <button
                className={styles.button} 
                onClick={getList}>
                    <i className="fas fa-search"></i>
            </button>
        </div>
    );
};

export default SearchNotice;
