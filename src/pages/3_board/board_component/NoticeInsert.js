import React from "react";
import { useState } from "react";
import styles from './NoticeInsert.module.css';
import axios from "axios";

const NoticeInsert = ({ history }) => {
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    });

    const { title, content } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const ntInsert = async () => {
        const result = await axios.post("/board/notice/insert", {
            bn_title: inputs.title,
            bn_content: inputs.content,
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs",
        });
        history.push("/main/admin/board/notice");
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>공지사항 등록</div>
            <div className={styles.content}> 
            
                <div className={styles.header}> 
                    <div>작성자 :</div>
                    <div>김민준</div>
                </div> 
               
                <div className={styles.body}>
                    <div>
                        <label className={styles.labelTitle} htmlFor="title">제목</label>                                           
                        <input
                            id="title"
                            type="text"
                            onChange={onChange}
                            name="title"
                            value={title}
                            className={styles.inputTitle}
                        ></input>                       
                    </div>

                    <div className={styles.textareaContainer}>
                        <label className={styles.labelTitle} htmlFor="content">내용</label>                        
                        <textarea
                            className={styles.textarea}
                            id="content"
                            name="content"
                            value={content}
                            onChange={onChange}
                        ></textarea>                        
                    </div>                   
                </div>                
                    <button  className = {styles.sendButton} onClick={() => {ntInsert();}}>등록</button>                        
            </div>
        </div>
    );
};

export default NoticeInsert;
