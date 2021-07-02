import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './NoticeUpdate.module.css';

const NoticeUpdate = ({ match, history }) => {
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

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get(
            "/board/notice/detail/" + match.params.id
        );
        setInputs({
            ...inputs,
            title: result.data.result.bn_title,
            content: result.data.result.bn_content,
        });
    };

    const onClick = async () => {
        const result = await axios.put("/board/notice/update", {
            bn_id: match.params.id,
            bn_title: inputs.title,
            bn_content: inputs.content,
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs",
        });
        history.push(`/main/board/notice/detail/${match.params.id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>공지 수정</div>
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

                <button className = {styles.sendButton} onClick={() => {onClick();}}>수정하기</button>
                        
            </div>
        </div>
    </div>
    );
};

export default NoticeUpdate;
