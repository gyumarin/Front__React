import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './QnaUpdate.module.css';
import { useHistory } from 'react-router';

const QnaUpdate = ({ match, history }) => {
    const nowhistory = useHistory();
    const isAdmin = nowhistory.location.pathname.split("/")[2] == "admin" ? true : false;


    const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    const [empName, setEmpName] = useState('');
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
        if(inputs.title==""){
            alert("제목을 작성해 주세요.")
        }else{
            const result = await axios.put("/board/qna/update", {
                bq_id: match.params.id,
                bq_title: inputs.title,
                bq_content: inputs.content,
            });
            history.push(`/main/board/qna/detail/${match.params.id}`);
        }
        
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

    useEffect(() => {
        axios.get(`/employee/detail`,{headers: {
            'token': tmp
          }}).then((res) => {setEmpName(res.data.result.e_name)} )
    }, [])

    return (
        <div className={styles.container}>
                <div className={isAdmin ? styles.adminTitle:styles.title}>질문 수정</div>
                    {/* <div className={styles.warning}> <i className="fas fa-exclamation-triangle"></i> 해당 QNA은 사내 시설, 공지, 이벤트 등 공적 업무 수행에 대한 질문에 한합니다.</div> */}
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
                        <button className={isAdmin ? styles.adminButton : styles.sendButton} onClick={() => {ntUpdate();}}>저장</button>
                      </div>                      
                </div>                
            </div>
    );
};

export default QnaUpdate;
