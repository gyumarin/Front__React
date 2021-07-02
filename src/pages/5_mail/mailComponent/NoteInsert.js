import axios from "axios";
import React from "react";
import styles from "./NoteInsert.module.css";
import { useState } from "react";

const NoteInsert = ({ history }) => {
    const [inputs, setInputs] = useState({
        send: "",
        title: "",
        content: "",
        sName: "",
    });

    const [search, setSearch] = useState(false);

    const [list, setList] = useState([]);

    const { send, title, content, sName } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const getEmployee = async () => {
        const result = await axios.get("/note/search?e_name=" + sName);
        setSearch(true);
        setList(result.data.result);
    };

    const checkName = e => {
        setSearch(false);
        setInputs({
            ...inputs,
            send: e.target.value,
        });
    };

    const nInsert = async () => {
        const result = await axios.post("/note/send", {
            e_send: send,
            n_title: title,
            n_content: content,
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDEwIiwiZXhwIjoxNjI0ODc4MjQ4fQ.VPURFwfyNnyaseMrlV7gLZX4_yU6Ity2UQKCaP0l2oY",
        });
        history.push("/main/mail/send/1010");
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>쪽지 쓰기</div>
            <div className={styles.content}>     

            <div className={styles.header}>     
                <div className={styles.who}>
                    <label  className ={styles.label} htmlFor="who">받는자</label>                
                    <input
                        id ="who"
                        type="text"
                        name="send"
                        onChange={onChange}
                        value={send}
                        className={styles.input1}
                    ></input>                
                </div>

                <div className={styles.search}>
                    <label className ={styles.label}  htmlFor="search">검색</label>
                
                    <input
                        id="search"
                        type="text"
                        name="sName"
                        onChange={onChange}
                        className={styles.input2}
                    ></input>
                    <button className={styles.button1}onClick={getEmployee}>검색</button>
                    <div>
                    {search ? (
                        <select 
                            className={styles.select} 
                            name="fName" 
                            onChange={checkName}
                        >
                            <option>선택</option>
                            {list.map((value, key) => {
                                return (
                                    <option
                                        value={value.e_id}
                                        key={key}
                                    >
                                        {value.e_name}
                                    </option>
                                );
                            })}
                        </select>
                    ) : null}
                </div> 
                </div>                             
            </div>


            <div className={styles.body}>
                <div >
                    <label className={styles.labelTitle} htmlFor="title">제목</label>                    
                    <input
                        className={styles.inputTitle}
                        id="title"
                        type="text"
                        name="title"
                        onChange={onChange}
                    ></input>
                </div>                
                
                <div className={styles.textareaContainer}>
                    <textarea
                        className={styles.textarea}
                        type="text"
                        name="content"
                        onChange={onChange}
                    ></textarea>
                </div>               
            </div>
            <button className={styles.sendButton}   onClick={nInsert}>보내기</button>
        </div>
        </div>
    );
};

export default NoteInsert;

