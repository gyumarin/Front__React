import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./NoteDetail.module.css";

const NoteDetail = ({ match }) => {
    const [detail, setDetail] = useState({});
    const [send, setSend] = useState({});
    const [post, setPost] = useState({});

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        const result = await axios.get(
            "/note/detail/?n_id=" +
                match.params.id +
                "&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDExIiwiZXhwIjoxNjI0ODc4MjcxfQ.lh_mozkBcmGGxHuGYFdIRsIH4f4x9tezL0yaiyhaogk"
        );
        await setDetail(result.data.result);
        setSend(result.data.result.send_p);
        setPost(result.data.result.post_p);
        console.log(result.data.result);
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>상세 내용</div>
                <div className={styles.content}>     

                <div className={styles.header}>                     
                   <div className={styles.who}>
                        <p>보낸 사람 : </p>
                        <p>{post.e_name} {post.e_id}</p>
                    </div>
                    <div>{detail.n_date}</div>  
                        {/* <tr>
                            <td>받는 사람</td>
                            <td>
                                {send.e_name} {send.e_id}
                            </td>
                        </tr>                   */}
                </div>

                <div className={styles.mailTitle}>       
                    <div>제목 : </div>
                    <div>{detail.n_title}</div>
                </div> 

                <div className={styles.contents}>
                    <td>{detail.n_content}</td>
                </div>                
           </div>
           <button className={styles.sendButton} >답장 보내기</button>
        </div>
    );
};

export default NoteDetail;
