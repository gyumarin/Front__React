import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './QnaUpdate.module.css';

const QnaUpdate = ({ match, history }) => {
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

    const ntUpdate = async () => {
        const result = await axios.put("/board/qna/update", {
            bq_id: match.params.id,
            bq_title: inputs.title,
            bq_content: inputs.content,
        });
        history.push(`/main/board/qna/detail/${match.params.id}`);
    };

    useEffect(() => {
        getDetail(); 
        
    }, []);

    const getDetail = async () => {
        const result = await axios.get("/board/qna/detail/" + match.params.id);
        setInputs({
            ...inputs,
            title: result.data.result.bq_title,
            content: result.data.result.bq_content,
        });
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
                        <button onClick={() => {ntUpdate();}}>수정</button>
                      </div>                      
                </div>                
            </div>
    );
};

export default QnaUpdate;
