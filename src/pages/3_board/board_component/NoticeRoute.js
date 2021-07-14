import React from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CommonBoard from "./CommonBoard";
import SearchNotice from "./SearchNotice";
import styles from './NoticeRoute.module.css';
import { useHistory } from 'react-router-dom';

const NoticeRoute = () => {

    const history = useHistory();
    const isAdmin = history.location.pathname.split("/")[2] == "admin" ? true : false;

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

    const listMax = 12;
    
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
        await console.log(result.data.result)

        setViewList(result.data.result.slice(0, listMax));
        let c = parseInt(result.data.result.length / listMax);

        if (result.data.result.length % listMax != 0) {c++;}
        if (c < 5) {setLastCount(c);}

        setCount(c);

        if(result.data.result.length != 0){
            const find = Object.keys(result.data.result[0]);
            setKeys(find[0]);
        }
        
        
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
            <div className={isAdmin ? styles.adminTitle :styles.title}>{isAdmin ? "공지사항 관리" : "공지사항"}</div>
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
                <p style = {{marginLeft:"6em", marginBottom : "-0.5em"}}>총 게시글 <span style ={{color : "#00aaef" }}>{list.length}</span>건</p>
                {list.length!=0?<CommonBoard
                    viewList={viewList}
                    list={list}
                    PaginationBasic={PaginationBasic}
                    th={noticeTh}
                    keys={keys}
                />:
                <div style={{}}>
                    <h3 style={{margin:'250px 0px 0px 650px'}}> 검색된 결과가 없습니다. </h3>
                    <button onClick={()=>getList()} className={isAdmin ? styles.adminTitle :styles.title} style={{margin:'250px 0px 0px 690px'}}><b> 뒤로 가기</b> </button>
                </div>}

            </div> 
        </div>
    );
};



export default NoticeRoute;
