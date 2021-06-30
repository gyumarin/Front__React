import React from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CommonBoard from "./CommonBoard";
import SearchNotice from "./SearchNotice";
import styles from './NoticeRoute.module.css';

const NoticeRoute = () => {

    const [list, setList] = useState([]);               //전체리스트
    const [viewList, setViewList] = useState([]);       //해당번호에 보여질 리스트
    const [active, setActive] = useState(1);            // 현재번호

    const [count, setCount] = useState(1);              // 페이지 번호 총개수
    const [firstCount, setFirstCount] = useState(1);    // 보여질 번호
    const [lastCount, setLastCount] = useState(5);      // 보여질 번호

    const [keys, setKeys] = useState("");

// --------------------------------------------------------------------------------
    const noticeTh = {
        num: "번호",
        title: "제목",
        writer: "책임자",
        date: "일자",
        hits: "조회수",
    };

    const listMax = 10;
    
// --------------------------------------------------------------------------------
    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        setViewList(list.slice(active * listMax - listMax, active * listMax));
    }, [active]);

    
    const getList = async () => {

        const result = await axios.get("/board/notice/list");
        await setList(result.data.result);

        setViewList(result.data.result.slice(0, listMax));
        let c = parseInt(result.data.result.length / listMax);

        if (result.data.result.length % listMax != 0) {c++;}
        if (c < 5) {setLastCount(c);}

        setCount(c);

        const find = Object.keys(result.data.result[0]);
        setKeys(find[0]);
    };

// --------------------------------------------------------------------------------
    // page 처리
    const pageNumberAdd = () => {
        if (lastCount < count) {
            setLastCount(lastCount + 1);
            setFirstCount(firstCount + 1);
        }
    };

    const pageNumberMin = () => {
        if (firstCount != 1) {
            setLastCount(lastCount - 1);
            setFirstCount(firstCount - 1);
        }
    };  

// --------------------------------------------------------------------------------
    let items = [];


    for (let number = firstCount; number <= lastCount; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => {
                    setActive(number);
                }}
            >
                {number}
            </Pagination.Item>
        );
    }

    // Pagination function
    const PaginationBasic = () => {
        return (
            <div>
                <Pagination>
                    <Pagination.First onClick={() => {pageNumberMin();}}/>
                    {items}
                    <Pagination.Last onClick={() => {pageNumberAdd();}}/>
                </Pagination>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>공지사항</div>
            <div className={styles.content}>
                <SearchNotice
                    setList={setList}
                    setViewList={setViewList}
                    setCount={setCount}
                    setActive={setActive}
                    listMax={listMax}
                    setFirstCount={setFirstCount}
                    setLastCount={setLastCount}
                ></SearchNotice>

                <CommonBoard
                    viewList={viewList}
                    list={list}
                    PaginationBasic={PaginationBasic}
                    th={noticeTh}
                    keys={keys}
                ></CommonBoard>
            </div> 
        </div>
    );
};

export default NoticeRoute;
