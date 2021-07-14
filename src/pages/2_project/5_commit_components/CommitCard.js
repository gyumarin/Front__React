import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import CommitWorkList from './CommitWorkList';
// import styles from './CommitListPage.module.css';
import styles from './CommitCard.module.css';

const CommitCard = ({ info, useBranch, projectInfo ,nick}) => {

    var tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);


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
                if (nick == info.commit.committer.name) {
                    axios.post("/commit/insert", {
                        token: tmp,
                        p_id: projectInfo.p_id,
                        cl_comment: "",
                        sha: info.sha,
                    });
                }

                setComment({ ...comment, sha: info.sha, text: '', state: false });
                
            }
        });
        setToggle(false);
        getGitWorkList();

    }, [useBranch]);

    const getGitWorkList = async () => {
        const result = await axios.get("/commit/work/list?sha=" + info.sha);
        setGitWorkList(result.data.result);
    };


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

    const onInsert = () => {
        //axios로 수정 로직 처리
        axios.put("/commit/update", {
            cl_comment: inputText.text,
            sha: info.sha,
        });
        setComment({ ...comment, text: inputText.text, state: true });
        // }
        //등록 or 수정 끝나면 inputText 값을 제거
        setInputText({ ...inputText, text: "" });

        //폼 안보이게 처리 anvisible
        setToggle(false);
    };

    //업무 등록
    const onGitWorkList = (work) => {
        var check = window.confirm("업무를 추가 하시겠습니까? ")
        if(check){
            if (gitWorkList.filter(item => item.wl_id == work.wl_id).length == 0) {
                setGitWorkList(gitWorkList.concat(work));
                const result = axios.post("/commit/work/list", {
                    sha: info.sha,
                    wl_id: work.wl_id,
                });
            }else{
                alert('이미 등록 되어 있습니다.')
            }
        }
        
    };

    //업무 승인 요청
    const onRequestWorkList = (wl_id) => {
        var check = window.confirm("업무 승인을 요청 하시겠습니까? ")
        if(check){
            const result = axios.put("/project/request/" + wl_id);
            const copy = [...gitWorkList];
            copy.find(item => item.wl_id == wl_id).wl_done = 2;
            setGitWorkList(copy);
        }
    };

    

    //업무 삭제
    const onDeleteWorkList = (work) =>{
        var check = window.confirm("업무 제외 하시겠습니까? ")
        if(check){
            const result = axios.delete(`/commit/work/list?sha=${info.sha}&wl_id=${work.wl_id}`);
            setGitWorkList(gitWorkList.filter(item=>item.wl_id!=work.wl_id))
        }
    }


    return (
        <div style={{ margin: '0px 0px 0px 20px',}} >
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor:"#eef1f5", borderRadius:"20px", marginBottom:"1em", height:'120px'}}>
                <div style={{  width: '500px', height:'100px',paddingLeft:'30px'}}>             
                        <div style={{  paddingBottom:'5px',color:'rgba(1, 1, 240, 0.5)', fontSize:'12px'}}>{info.commit.author.date} <b style={{paddingLeft:'200px'}}>committer :</b> {info.commit.committer.name}</div>
                        <div style={{display:'grid' , gridTemplateColumns:'110px 360px'}}><b>commit 내용 :</b>   {info.commit.message}</div>
                        
                </div>
                {/* 글 블록 지정 막기 : userSelect:'none'
                <div  variant="outline-primary" style={{ userSelect:'none', color:'blue', fontSize:'50px', paddingRight:'30px' }}>
                {nick == info.commit.committer.name && (
                        !toggle ? (
                            <p>+</p>
                        ) : null
                    )}

                </div> */}
                
                <div style={{}}>
                    {toggle && (
                        <div style={{position:'fixed',top:'230px', left:'1200px',width:'610px', height:'585px', 
                        backgroundColor:'aliceblue', borderRadius:'10px', boxShadow: ' 6px 7px 22px 0px rgba(0, 0, 0, 0.44)',}}>
                            <div style={{ padding:'10px', display:'flex', alignItems:'center'}}>
                            <b style={{ marginTop:'15px', marginLeft:'10px',padding:'10px',fontSize:'20px', width:'480px',
                                        borderRadius:'5px', backgroundColor:'#88e3ff',height:"50px", paddingLeft:'30px',color:'white' }}>
                                 {nick == info.commit.committer.name ? '업무 등록 및 요청 / Commit 코멘트 등록':' 업무 처리 및 Commit 코멘트 조회'}
                            </b> 
                            {nick == info.commit.committer.name ?
                                <button style={{backgroundColor:'rgba(0,0,0,0)', marginLeft:'60px',marginTop:'-15px', color:'black', fontSize:'30px', border:'0', height:"30px"}}onClick={onToggle}> x </button> : 
                                <button style={{backgroundColor:'rgba(0,0,0,0)', marginLeft:'60px',marginTop:'-25px', color:'black', fontSize:'30px', border:'0', height:"30px"}}onClick={onToggle}> x </button>
                            }
                            </div>
                            
                           <div>  
                                <CommitWorkList comment={comment.text} onGitWorkList={onGitWorkList} projectID={projectInfo.p_id} userBool={nick == info.commit.committer.name}/>
                           </div>
                            

                            <div style={{padding: '10px', paddingLeft:'35px', width:'590px', height:'135px'}}>  
                                <b>Git에서 처리한 업무</b>
                                <div style={{height:'85px', display:'flex', flexWrap:'wrap', backgroundColor:'white', borderRadius:'5px', margin:'10px 10px 10px 0px'}}>
                                    {gitWorkList.map((item, index)=>{
                                        return (
                                            <button key={index} disabled style={{ display:'flex', borderRadius:'5px', backgroundColor:'white', height:'30px' ,width:'150px', margin:'5px 5px 5px 20px'}}>
                                                <div style={{textAlign:'center', marginRight:'15px', borderRadius:'10px',backgroundColor:'#007bbc', height:'22px' ,width:'30px', color:'yellow', fontSize:'14px'}}>
                                                    {item.wl_id}
                                                </div>
                                                {
                                                item.wl_done==2?
                                                    <>
                                                    <b><p style={{ marginLeft:'10px', color:'black', fontSize:'14px', }}>승인 중</p></b>
                                                    <button onClick={()=>onDeleteWorkList(item)}style={{ border:'0px',backgroundColor:'rgba(0,0,0,0)',fontSize:'14px',paddingLeft:'20px', width:"1px"}}>x</button>
                                                    </>
                                                    :
                                                    <>
                                                    <button onClick={()=>onRequestWorkList(item.wl_id)} style={{ border:'0px',borderRadius:'3px', backgroundColor:'#00aaef', width: '70px', height:'24px', color:'white', fontSize:'13px',paddingTop:'-40px' }}>
                                                       <b>승인 요청</b>
                                                    </button>
                                                    <button onClick={()=>onDeleteWorkList(item)} style={{border:'0px', backgroundColor:'rgba(0,0,0,0)', fontSize:'14px',paddingLeft:'8px'}}>x</button>
                                                    </>
                                                }
                                               
                                            </button> 
                                            
                                            
                                        )
                                    })}

                                </div>
                            </div>

                            {nick == info.commit.committer.name &&<div style={{paddingLeft:'30px'}}>
                                <b>{nick == info.commit.committer.name ?'Commit 코멘트 등록':'Commit 코멘트 조회'}</b>
                                <Form style={{ display: 'flex',  alignItems: 'center', margin: '5px 0px 0px 0px', }} onSubmit={onInsert}>
                                    
                                    <Form.Group controlId="formBasicEmail" style={{paddingRight:'10px'}}>
                                        <Form.Control
                                            style={{ width: '460px', height: '40px' }}
                                            type="text"
                                            value={inputText.text}
                                            placeholder="추가적으로 입력하실 업무 사항을 기록해 주세요."
                                            onChange={onChange}
                                            disabled={nick != info.commit.committer.name}
                                        />
                                    </Form.Group>
                                   <Button style={{ width: '80px', height: '37px',  padding:'8px 0px 10px 0px', margin: '-16px 0px 0px 0px',backgroundColor:'#007bbc',border:'0px' }} variant="primary" onClick={onInsert}>
                                         등록
                                    </Button>   
                                </Form>
                            </div> }  

                        </div>
                        
                    )}
                    
                   
                <div style={{width:'2px', height:'100px' ,backgroundColor:'gray', marginRight:'20px'}}/>  
                </div>
                {
                !toggle &&
                <div  style={{ margin: '10px 10px 20px 0px', width:'550px',  height: '90px'}} >
                    <div style={{display:'flex', height: '30px'}}>
                        <p style={{paddingRight:'15px'}}><b>work comment</b></p>
                        {gitWorkList.map((item, index)=>{
                            return (
                                <div key={index} style={{marginRight:'20px', borderRadius:'10px',backgroundColor:'#007bbc', 
                                            height:'22px' ,width:'40px', color:'yellow', fontSize:'14px', paddingLeft:'12px'}}>
                                    <b>{item.wl_id}</b>
                                </div>   
                            )
                        })}
                    </div>
                    {/* <div style={{ display:'grid', gridTemplateColumns:'125px 440px',  width:'580px',}}>
                        <p>업무 추가 사항 : </p>
                        <p style={{ borderRadius:'5px', backgroundColor:'white',height:'65px', padding:'8px'}}>{comment.text}</p>
                    </div> */}
                    <div style={{  width:'580px', display:'flex'}}>
                        <p className={styles.ellipsis}>{comment.text}</p>
                        <div style={{paddingLeft:"10px", }} onClick={onToggle}>
                            <button style={{ width:'80px', height:'40px', borderRadius:'5px', border:'0px', backgroundColor:'#007bbc', color:'white'}}>Detail</button>
                        </div>
                    </div>
                   
                    
                </div>
                }
            </div>
             
        </div>
    );
};

export default CommitCard;