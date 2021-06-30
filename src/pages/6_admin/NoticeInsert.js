import React from "react";
import { useState } from "react";
import axios from "axios";

const NoticeInsert = ({ history }) => {
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

    const ntInsert = async () => {
        const result = await axios.post("/board/notice/insert", {
            bn_title: inputs.title,
            bn_content: inputs.content,
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNjI0NjAxNzUxfQ.2AA-87y9DEyjJo94Z91IrsuD_06_VAgVqczvkzBdnHs",
        });
        history.push("/");
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
                                    ntInsert();
                                }}
                            >
                                등록
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NoticeInsert;
