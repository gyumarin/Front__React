import axios from "axios";
import React, { useEffect, useState } from "react";

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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>공지 등록</th>
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
                                    onClick();
                                }}
                            >
                                수정
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NoticeUpdate;
