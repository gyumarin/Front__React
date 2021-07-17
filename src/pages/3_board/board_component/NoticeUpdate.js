import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './NoticeUpdate.module.css';

const NoticeUpdate = ({ match, history }) => {
    const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    });

    const { title, content } = inputs;
    const [empName, setEmpName] = useState('');
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

        axios.get(`/employee/detail`,{headers: {
            'token': tmp
          }}).then((res) => {setEmpName(res.data.result.e_name)} )
    };



    const onClick = async () => {
        if(inputs.title==""){
            alert("제목을 작성해 주세요.")
        }else{
            const result = await axios.put("/board/notice/update", {
                bn_id: match.params.id,
                bn_title: inputs.title,
                bn_content: inputs.content,
                token: tmp,
            });
            history.push(`/main/board/notice/detail/${match.params.id}`);
        }
        
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>공지사항 수정</div>
            <div className={styles.warning}> <i className="fas fa-exclamation-triangle"></i> 개인 용무에 대한 질문은 사내 복지 지원팀에 연락바랍니다.</div>
            <div className={styles.content}> 

            <div className={styles.header}> 
                <div>작성자 
                    <input className={styles.sendMan} type="text" value={empName} readOnly/>
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
                    ></input>                       
                </div>

                <div className={styles.textareaContainer}>
                    
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
