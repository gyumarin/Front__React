import React from "react";
import { Table, Pagination } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CommonBoard from "./CommonBoard";
import SearchQna from "./SearchQna";
import styles from './QnaRoute.module.css';
import { useHistory } from 'react-router';

const QnaRoute = () => {

    const history = useHistory();
    const isAdmin = history.location.pathname.split("/")[2] == "admin" ? true : false;

    const [list, setList] = useState([]);
    const [viewList, setViewList] = useState([]);
    const [active, setActive] = useState(1);
    const [count, setCount] = useState(1);
    const [firstCount, setFirstCount] = useState(1); // 보여질 번호
    const [lastCount, setLastCount] = useState(5); // 보여질 번호

    const [keys, setKeys] = useState("");

    const qnaTh = {
        num: "번호",
        title: "제목",
        writer: "작성자",
        date: "일자",
        hits: "조회수",
    };

    const listMax = 10;

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        setViewList(list.slice(active * listMax - listMax, active * listMax));
    }, [active]);

    const pageNumberAdd = () => {
        if (lastCount < count) {
            setLastCount(lastCount + 1);
            setFirstCount(firstCount + 1);
        } else {
        }
    };

    const pageNumberMin = () => {
        if (firstCount != 1) {
            setLastCount(lastCount - 1);
            setFirstCount(firstCount - 1);
        } else {
        }
    };

    const getList = async () => {
        const result = await axios.get("/board/qna/list");
        await sortList(result.data.result);

        let c = parseInt(result.data.result.length / listMax);
        if (result.data.result.length % listMax != 0) {
            c++;
        }
        if (c < 5) {
            setLastCount(c);
        }

        setCount(c);

        const find = Object.keys(result.data.result[0]);
        setKeys(find[0]);
    };

    const sortList = viewList => {
        let sList = [];
        let s = {};
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

    const PaginationBasic = () => {
        return (
            <div>
                <Pagination>
                    <Pagination.First
                        onClick={() => {
                            pageNumberMin();
                        }}
                    />
                    {items}
                    <Pagination.Last
                        onClick={() => {
                            pageNumberAdd();
                        }}
                    />
                </Pagination>
            </div>
        );
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>{isAdmin? "QnA 관리" : "QnA"}</div>
            <div className={styles.content}>
                <SearchQna
                    setList={setList}
                    setViewList={setViewList}
                    setCount={setCount}
                    setActive={setActive}
                    listMax={listMax}
                    setFirstCount={setFirstCount}
                    setLastCount={setLastCount}
                ></SearchQna>
                
                <CommonBoard
                    viewList={viewList}
                    list={list}
                    PaginationBasic={PaginationBasic}
                    th={qnaTh}
                    keys={keys}
                ></CommonBoard>
            </div>
        </div>
    );
};

export default QnaRoute;
