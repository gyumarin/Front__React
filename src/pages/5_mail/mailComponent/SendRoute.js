import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SendNoteBoard from "./SendNoteBoard";
import { Pagination } from "react-bootstrap";
import styles from "./SendRoute.module.css";

//받은쪽지함
const SendRoute = ({ match }) => {
    const [list, setList] = useState([]); //전체리스트
    const [viewList, setViewList] = useState([]); //해당번호에 보여질 리스트
    const [active, setActive] = useState(1); // 현재번호
    const [count, setCount] = useState(1); //번호 총개수
    const [firstCount, setFirstCount] = useState(1); // 보여질 번호
    const [lastCount, setLastCount] = useState(5); // 보여질 번호

    const [deleteList, setDeleteList] = useState([]);

    const [checked, setChecked] = useState([]);

    const listMax = 3;

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        setViewList(list.slice(active * listMax - listMax, active * listMax));
        let checkn = [];
        list.slice(0, listMax).forEach(e => {
            checkn.push(false);
            setChecked(checkn);
        });
    }, [active]);

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

    const getList = async () => {
        const result = await axios.get("/note/send/" + match.params.id);
        await setList(result.data.result);
        setViewList(result.data.result.slice(0, listMax));
        let c = parseInt(result.data.result.length / listMax);
        if (result.data.result.length % listMax != 0) {
            c++;
        }
        if (c < 5) {
            setLastCount(c);
        }
        setCount(c);
        let checkn = [];
        result.data.result.slice(0, listMax).forEach(e => {
            checkn.push(false);
            setChecked(checkn);
        });
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

    const deleteNote = async () => {
        const result = await axios.put("/note/delete", {
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDA1IiwiZXhwIjoxNjI0ODc4NzIwfQ.j71xypHD15AJNibLWqkCTczpjLN_Wjxx4NKJ7U3FRuQ",
            n_id: deleteList,
        });
        let le = list;
        deleteList.forEach(element => {
            le = le.filter(e => e.n_id != element);
        });
        setList(le);
        setViewList(le.slice(0, listMax));
        let c = parseInt(le.length / listMax);
        if (le.length % listMax != 0) {
            c++;
        }
        if (c < 5) {
            setLastCount(c);
        }
        setCount(c);
        let checkn = [];
        le.slice(0, listMax).forEach(e => {
            checkn.push(false);
            setChecked(checkn);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>받은 쪽지</div>
            <div className={styles.content}>                
                <SendNoteBoard
                    viewList={viewList}
                    list={list}
                    PaginationBasic={PaginationBasic}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    deleteNote={deleteNote}
                    checked={checked}
                    setChecked={setChecked}
                ></SendNoteBoard>
            </div>
        </div>
        
    );
};

export default SendRoute;
