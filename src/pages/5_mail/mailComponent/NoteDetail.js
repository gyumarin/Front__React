import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./NoteDetail.module.css";
import { Link, useHistory } from "react-router-dom";

const NoteDetail = ({ match }) => {
    const history = useHistory();
    const where = history.location.pathname.split("/")[4];


    const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);

    const [detail, setDetail] = useState({});
    const [send, setSend] = useState({});
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get(
            "/note/detail?n_id=" + match.params.id + "&token=" + tmp
        );
        setDetail(result.data.result);
        setSend(result.data.result.send_p);
        setPost(result.data.result.post_p);
        const result2 = await axios.get("/employee/detail?token=" + tmp);
        setUser(result2.data.result);

        // console.log(result2.data.result);
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>상세 내용</div>
            
            <div className={styles.contContainer}>

                <div className={styles.content}>
                
                    <div className={styles.header}>
                        <div className={styles.titleContainer}> 
                            <div className={styles.signal}>제목 </div>
                            <div className={styles.titleValue}>{detail.n_title}</div>        

                            <div className={styles.date}>
                                {`보낸이 : ${post.e_name}  
                                |  작성일 : ${detail.n_date}  
                                |  받는이 : ${send.e_name}`}
                            </div>   
                        </div>                                  
                    </div>                

                    <pre  className={styles.contentBody} style={{fontFamily:'Noto Sans, sans-serif'}}>{detail.n_content}</pre>
            </div>

            {
                where == "post" ? 
                null :
                send.e_id == user.e_id 
                ? <Link to={`/main/mail/write/` + post.e_id}><button className={styles.sendButton}> 답장 보내기</button></Link>
                : null
            }
        </div>
    </div>
    );
};

export default NoteDetail;
