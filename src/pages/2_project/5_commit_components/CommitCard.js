import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import CommitWorkList from './CommitWorkList';


const CommitCard = ({ info, useBranch, projectInfo ,nick}) => {
    const [inputText, setInputText] = useState({ text: '', state: false });
    const [toggle, setToggle] = useState(false);
    const [comment, setComment] = useState({ sha: '', text: '', state: false });
    const [gitWorkList, setGitWorkList] = useState([])
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
                
            } catch {
                setComment({ ...comment, sha: info.sha, text: '', state: false });
                
            }
        });
        setToggle(false);
        
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
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        if (comment.state == false) {
            // axios 등록 로직 처리
            axios.post('/commit/insert', {
                token: tmp,
                p_id: projectInfo.p_id,
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

    const onGitWorkList =(work) =>{
        if(gitWorkList.filter(item=> item==work ).length == 0){
            setGitWorkList(gitWorkList.concat(work))
        }
    }

    return (
        <div style={{ margin: '0px 0px 0px 30px'}}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor:"#eef1f5", borderRadius:"20px", marginBottom:"1em", height:'100px'}}>
                <div style={{ display: 'grid', width: '500px', paddingLeft:'20px'}}>             
                        <div style={{  color:'rgba(1, 1, 240, 0.5)', fontSize:'12px'}}>{info.commit.author.date}</div>
                        <div style={{ }}><b>commit 내용</b> :  {info.commit.message}</div>
                </div>
                {/* 글 블록 지정 막기 : userSelect:'none' */}
                <div onClick={onToggle} variant="outline-primary" style={{ userSelect:'none', color:'blue', fontSize:'50px', paddingRight:'30px' }}>
                {nick == info.commit.committer.name ? (
                        !toggle ? (
                            <p>+</p>
                        ) : (
                            <p style={{ marginLeft: "8px" }}>-</p>
                        )
                    ) : null}

                </div>
                
                <div style={{}}>
                    {toggle && (
                        <div style={{position:'fixed',top:'257px', width:'550px', height:'560px', backgroundColor:'aliceblue', borderRadius:'10px', boxShadow: ' 6px 7px 22px 0px rgba(0, 0, 0, 0.44)',}}>
                            <p style={{padding:'30px 0px 0px 20px'}}>업무 등록 및 요청 & Commit 코멘트 추가</p>
                            <div>  
                                <CommitWorkList onGitWorkList={onGitWorkList} projectID={projectInfo.p_id}/>
                            </div>

                            <div style={{padding: '15px',}}>  
                                Git에 등록한 업무
                                <div style={{height:'80px', display:'flex', flexWrap:'wrap', backgroundColor:'white'}}>
                                    {gitWorkList.map(item=>{
                                        return (
                                            <button disabled style={{ display:'flex', borderRadius:'5px', backgroundColor:'gray', height:'30px' ,width:'140px', margin:'10px'}}>
                                                <div style={{marginRight:'15px', borderRadius:'10px',backgroundColor:'#007bbc', height:'22px' ,width:'40px', color:'yellow', fontSize:'14px'}}>
                                                    {item.wl_id}
                                                </div>
                                                {
                                                item.wl_done==2?
                                                    <b><p style={{color:'yellow', fontSize:'14px', }}>승인 중</p></b>
                                                    :
                                                    <button style={{ width: '100px', height:'24px', color:'black', fontSize:'13px',paddingTop:'-30px' }}>
                                                       완료 요청
                                                    </button>
                                                }
                                            </button> 
                                            
                                            
                                        )
                                    })}

                                </div>
                            </div>

                            <div style={{padding:'15px'}}>
                                Commit 코멘트 등록
                                <Form style={{ display: 'flex',  alignItems: 'center', margin: '5px 0px 0px 0px', }} onSubmit={onInsert}>
                                    
                                    <Form.Group controlId="formBasicEmail" style={{paddingRight:'10px'}}>
                                        <Form.Control
                                            style={{ width: '425px', height: '40px' }}
                                            type="text"
                                            value={inputText.text}
                                            placeholder="추가적으로 입력하실 업무 사항을 기록해 주세요."
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                    <Button style={{ width: '80px', height: '37px',  padding:'8px 0px 10px 0px', margin: '-16px 0px 0px 0px' }} variant="primary" onClick={onInsert}>
                                        {comment.state ? '수정' : '등록'}
                                    </Button>   
                                </Form>
                            </div>    

                        </div>
                        
                    )}
                    
                   
                    
                </div>
                {!toggle &&<div  style={{ margin: '10px 0px 20px -20px'}}>{ comment.text}</div>}
            </div>
             
        </div>
    );
};

export default CommitCard;