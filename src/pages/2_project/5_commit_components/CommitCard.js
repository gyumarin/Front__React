import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { login } from './employee';
import axios from 'axios';


const CommitCard = ({ info, token, useBranch }) => {
    const [inputText, setInputText] = useState({ text: '', state: false });
    const [toggle, setToggle] = useState(false);
    const [comment, setComment] = useState({ sha: '', text: '', state: false });
    //DB에 등록이 되어 있는지?

    // chooseBrench()
    /*
    post로 보낼값
        1. token 값,
        2. 텍스트 값,
        3. sha 값,
        4. projectID
    */

    //시작을 하면 DB에서 CommitTest.js에서 들고온 sha와 DB의 sha가 동일한지 체크하고 동일하면, db의 cl_comment를 text에 입력.
    useEffect(() => {
        axios.get(`/commit?sha=${info.sha}`).then((res) => {
            try {
                setComment({ ...comment, sha: info.sha, text: res.data.result.cl_comment, state: true });
                console.log(res.data.result);
            } catch {
                setComment({ ...comment, sha: info.sha, text: '', state: false });
                console.log(res.data.result);
            }
        });
        setToggle(false);
        console.log('변경 감지됨.');
    }, [useBranch]);

    // input box 값.
    const onChange = useCallback((e) => {
        setInputText({ ...inputText, text: e.target.value });
    }, []);

    //   +/- 버튼
    const onToggle = () => {
        //form 펼쳤다, 닫았다하는 toggle
        setToggle(!toggle);

        //커밋 코멘트 등록이 이루어 졌었나?
        if (comment.state === true) {
            //이루어 졌으면, comment에 가져온 text값을 가지게 한다.
            setInputText({ ...inputText, text: comment.text });
            //커밋 코멘트 등록이 이루어 지지 않았다면?
        } else {
            setInputText({ ...inputText, text: '' });
        }
    };

    //등록 버튼
    const onInsert = () => {
        if (comment.state == false) {
            // axios 등록 로직 처리
            axios.post('/commit/insert', {
                token: token,
                p_id: 5,
                cl_comment: inputText.text,
                sha: info.sha,
            });

            setComment({ ...comment, text: inputText.text, state: true });
            //comment가 있을 때
        } else if (comment.state == true) {
            //axios로 수정 로직 처리
            axios.put('/commit/update', {
                cl_comment: inputText.text,
                sha: info.sha,
            });
            setComment({ ...comment, text: inputText.text, state: true });
        }
        //등록 or 수정 끝나면 inputText 값을 제거
        setInputText({ ...inputText, text: '' });

        //폼 안보이게 처리 anvisible
        setToggle(false);
    };

    return (
        <div style={{ margin: '0px 0px 0px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div style={{ display: 'grid', width: '500px', }}>
                    <Card.Body>
                        
                        <div style={{  color:'rgba(1, 1, 240, 0.5)', fontSize:'12px'}}>{info.commit.author.date}</div>
                        <div style={{ }}><b>commit 내용</b> :  {info.commit.message}</div>
                        
                    </Card.Body>
                </div>
                {/* 글 블록 지정 막기 : userSelect:'none' */}
                <div onClick={onToggle} variant="outline-primary" style={{ userSelect:'none', margin:'20px ',color:'blue', fontSize:'50px'  }}>
                    {!toggle ? <p>+</p>: <p style={{marginLeft:'5px'}}>-</p>}
                </div>
                
                <div style={{height:'100px', padding:'20px'}}>
                    
                    {toggle && (
                        
                        <Form style={{ display: 'flex', alignItems: 'center', margin: '5px 0px 0px 0px', }} onSubmit={onInsert}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    style={{ width: '400px', height: '40px' }}
                                    type="text"
                                    value={inputText.text}
                                    placeholder="추가적으로 입력하실 업무 사항을 기록해 주세요."
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Button style={{ width: '80px', height: '40px',  padding:'8px 0px 10px 0px', margin: '-20px 0px 0px 20px' }} variant="primary" onClick={onInsert}>
                                {comment.state ? '수정' : '등록'}
                            </Button>   
                        </Form>
                        
                    )}
                    
                   
                    
                </div>
                {!toggle &&<div  style={{ margin: '10px 0px 20px -20px', width: '400px' }}>{ comment.text}</div>}
            </div>
             
        </div>
    );
};

export default CommitCard;
