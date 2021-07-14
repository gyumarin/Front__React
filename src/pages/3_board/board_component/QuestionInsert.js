import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./QuestionInsert.module.css";

const QuestionInsert = ({ history }) => {
    const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    });
    const [empName, setEmpName] = useState('');
    const { title, content } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const ntInsert = async () => {
        if(inputs.title==""){
            alert("제목을 작성해 주세요.")
        }else{
            const result = await axios.post("/board/qna/qinsert", {
                bq_title: inputs.title,
                bq_content: inputs.content,
                token: tmp,
            });
            history.push("/main/board/qna");
        }
        
    };

    useEffect(() => {
        axios.get(`/employee/detail?token=${sessionStorage.getItem('token').slice(0, -1).substr(1)}`).then((res) => {setEmpName(res.data.result.e_name)} )
    }, [])

    
    return (
        <div className={styles.container}>
            <div className={styles.title}>질문 등록</div>
            <div className={styles.warning}> <i className="fas fa-exclamation-triangle"></i> 해당 QNA은 사내 시설, 공지, 이벤트 등 공적 업무 수행에 대한 질문에 한합니다.</div>
            <div className={styles.warning}> <i className="fas fa-exclamation-triangle"></i> 개인 용무에 대한 질문은 사내 복지 지원팀에 연락바랍니다.</div>
                <div className={styles.content}> 
                    
                    <div className={styles.header}> 
                        <div>작성자
                            <input className={styles.sendMan} type="text" defaultValue={empName} readOnly/>
                        </div>
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
                                autoFocus
                            ></input>                       
                        </div>

                        <div className={styles.textareaContainer}>
                            {/* <label className={styles.labelTitle} htmlFor="content">내용</label>                         */}
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
