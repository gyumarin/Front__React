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

    const [slist, setSlist] = useState([]);

    const listMax = 12;
    const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);
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
        const result = await axios.get("/note/post",{headers: {
            'token': tmp
          }});
        setSlist(result.data.result);
        setting(result.data.result);
        setReadView(result.data.result.filter(e => e.n_done == true));
        setNreadView(result.data.result.filter(e => e.n_done != true));
    };

    /*                 */
    const all = () => {
        getList();
    };

    const read = () => {
        setting(readView);
    };

    const nread = () => {
        setting(nreadView);
    };

    const search = async (event) => {
        // event.preventDefault();
        const result = await axios.get(
            "/note/post/search?value=" + value, {headers: {
                'token': tmp
              }}
        );
        setSlist(result.data.result);
        setting(result.data.result);
        setReadView(result.data.result.filter(e => e.n_done == true));
        setNreadView(result.data.result.filter(e => e.n_done != true));
    };

    const deleteNote = async () => {
        if(!window.confirm("삭제하시겠습니까?"))return;
        const result = await axios.put("/note/delete", {
            token: tmp,
            n_id: deleteList,
        });
        let le = slist;

        deleteList.forEach(element => {
            le = le.filter(e => e.n_id != element);
        });
        setting(le);
        setReadView(le.filter(e => e.n_done == true));
        setNreadView(le.filter(e => e.n_done != true));
    };

    const setting = result => {
        setList(result);
        setViewList(result.slice(0, listMax));
        let c = parseInt(result.length / listMax);
        if (result.length % listMax != 0) {
            c++;
        }
        if (c < 5) {
            setLastCount(c);
        }
        setCount(c);
        setActive(1);
        let checkn = [];
        result.slice(0, listMax).forEach(e => {
            checkn.push(false);
            setChecked(checkn);
        });
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
