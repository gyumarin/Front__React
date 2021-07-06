import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./QuestionInsert.module.css";

const QuestionInsert = ({ history }) => {
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
        const result = await axios.post("/board/qna/qinsert", {
            bq_title: inputs.title,
            bq_content: inputs.content,
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs",
        });
        history.push("/main/board/qna");
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>QnA 등록</div>
                <div className={styles.content}> 

                <div className={styles.header}> 
                    <div>작성자 : 김민준</div>
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

                    <button  className = {styles.sendButton} onClick={() => {ntInsert();}}>질문 등록</button> 
                </div>
            </div>
        </div>
    );
};

export default QuestionInsert;