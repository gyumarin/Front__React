import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>QnA / 질문하기</th>
                            <th>작성자 : </th>
                            <th>김민준님</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>제목 : </td>
                            <td>
                                <input
                                    type="text"
                                    onChange={onChange}
                                    name="title"
                                    value={title}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>
                                <textarea
                                    name="content"
                                    value={content}
                                    onChange={onChange}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    onClick={() => {
                                        ntUpdate();
                                    }}
                                >
                                    수정
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default QnaUpdate;
