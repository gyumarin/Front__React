import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PostNoteBoard from "./PostNoteBoard";
import { Pagination } from "react-bootstrap";
import styles from "./PostRoute.module.css";

//보낸쪽지함
const PostRoute = ({ match }) => {
    const [list, setList] = useState([]); //전체리스트
    const [viewList, setViewList] = useState([]); //해당번호에 보여질 리스트
    const [active, setActive] = useState(1); // 현재번호
    const [count, setCount] = useState(1); //번호 총개수
    const [firstCount, setFirstCount] = useState(1); // 보여질 번호
    const [lastCount, setLastCount] = useState(5); // 보여질 번호

    const [deleteList, setDeleteList] = useState([]);

    const [checked, setChecked] = useState([]);
    const [value, setValue] = useState("");

    const [readView, setReadView] = useState([]);
    const [nreadView, setNreadView] = useState([]);

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
        const result = await axios.get("/note/post/" + match.params.id);
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
        setReadView(result.data.result.filter(e => e.n_done == true));
        setNreadView(result.data.result.filter(e => e.n_done != true));
    };

 /*                 */
 const all = async () => {
    const result = await axios.get("/note/post/" + match.params.id);
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
    setActive(1);
    let checkn = [];
    result.data.result.slice(0, listMax).forEach(e => {
        checkn.push(false);
        setChecked(checkn);
    });
    setReadView(result.data.result.filter(e => e.n_done == true));
    setNreadView(result.data.result.filter(e => e.n_done != true));
};

const read = () => {
    setList(readView);
    setViewList(readView.slice(0, listMax));
    let c = parseInt(readView.length / listMax);
    if (readView.length % listMax != 0) {
        c++;
    }
    if (c < 5) {
        setLastCount(c);
    }
    setCount(c);
    setActive(1);
    let checkn = [];
    readView.slice(0, listMax).forEach(e => {
        checkn.push(false);
        setChecked(checkn);
    });
};

const nread = () => {
    setList(nreadView);
    setViewList(nreadView.slice(0, listMax));
    let c = parseInt(nreadView.length / listMax);
    if (nreadView.length % listMax != 0) {
        c++;
    }
    if (c < 5) {
        setLastCount(c);
    }
    setCount(c);
    setActive(1);
    let checkn = [];
    nreadView.slice(0, listMax).forEach(e => {
        checkn.push(false);
        setChecked(checkn);
    });
};

const search = async () => {
    const result = await axios.get(
        "/note/post/search?value=" + value + "&e_id=1005"
    );
    setList(result.data.result);
    setViewList(result.data.result.slice(0, listMax));
    let c = parseInt(result.data.result.length / listMax);
    if (result.data.result.length % listMax != 0) {
        c++;
    }
    if (c < 5) {
        setLastCount(c);
    }
    setCount(c);
    setActive(1);
    let checkn = [];
    result.data.result.slice(0, listMax).forEach(e => {
        checkn.push(false);
        setChecked(checkn);
    });
    setReadView(result.data.result.filter(e => e.n_done == true));
    setNreadView(result.data.result.filter(e => e.n_done != true));
};

/*                 */


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
            <div className={styles.title}>보낸 쪽지</div>
            <div className={styles.content}>     
                <PostNoteBoard
                    viewList={viewList}
                    list={list}
                    PaginationBasic={PaginationBasic}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    deleteNote={deleteNote}
                    checked={checked}
                    setChecked={setChecked}
                    search={search}
                    value={value}
                    setValue={setValue}
                    all={all}
                    read={read}
                    nread={nread}
                ></PostNoteBoard>
            </div>
        </div>

    );
};

export default PostRoute;
