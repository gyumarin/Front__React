import React from "react";
import { useState, useEffect } from "react";
import styles from './NoticeInsert.module.css';
import axios from "axios";
import { useHistory } from 'react-router';

const NoticeInsert = ({ history }) => {

    const nowHistory = useHistory();
    const isAdmin = history.location.pathname.split("/")[2] == "admin" ? true : false;

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
        const result = await axios.post("/board/notice/insert", {
            bn_title: inputs.title,
            bn_content: inputs.content,
            token: tmp,
        });
        history.push("/main/admin/board/notice");
    };

    useEffect(() => {
        axios.get(`/employee/detail?token=${tmp}`).then((res) => {setEmpName(res.data.result.e_name)} )
    }, [])

    return (
        <div className={styles.container}>
            <div className={nowHistory ? styles.adminTitle : styles.title}>공지사항 등록</div>
            <div className={styles.warning}> <i className="fas fa-exclamation-triangle"></i> 해당 공지사항 등록 전, 선임 확인 및 내용, 오탈자 등 꼭 확인부탁드립니다. </div>
            {/* <div className={styles.warning}> <i className="fas fa-exclamation-triangle"></i> 개인 용무에 대한 질문은 사내 복지 지원팀에 연락바랍니다.</div> */}
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
                </div>                
                    <button  className = {nowHistory ? styles.adminButton : styles.sendButton} onClick={() => {ntInsert();}}>공지 등록</button>                        
            </div>
        </div>
    );
};

export default NoticeInsert;
