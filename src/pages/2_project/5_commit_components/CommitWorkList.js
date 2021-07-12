import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Work from '../3_workList_components/Work';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './CommitWorkList.module.css';

const CommitWorkList = ({comment, userBool, onGitWorkList, projectID}) => {

    const [workList, setWorkList] = useState([])
    useEffect(() => {
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.get(`/project/work/list/person?p_id=${projectID}&token=${tmp}`).then(async res=>{
            await setWorkList(res.data.result.filter(item=>item.wl_done != 3))
            await console.log('workList', workList);
        })
    }, [])

    return (
        <div>
            {userBool?<div style={{padding: '5px 0px 0px 40px',}}>
                <b>미완료 업무 {workList.length!=0 ? workList.length : 0} 개</b>

                <div className={styles.commitWorkList} style={{height:'230px', marginBottom:'5px',backgroundColor:'white', width:'530px', borderRadius:'5px', marginTop:'10px',}}>

                    {workList.length!=0?workList.map((data, index)=>{
                        return (                
                                <Card onClick={()=>onGitWorkList(data)} key={index} style={{ margin : '3px 0px 5px 0px', paddingLeft : '5px' ,height : '60px', width:'530px',
                                                padding: '5px',display :'grid', gridTemplateRows : '16px 13px 13px', 
                                                gridTemplateColumns : '50px 70px 250px 90px 50px', fontSize:'12px'}}>
                                    <Card.Text style={{ gridColumn:'2/4'}}> {data.p_title} {' > '} {data.wl_work_category} {' > '} {data.wl_work}</Card.Text> 
                                    <Card.Text > 작업자 : {data.e_name}</Card.Text>
                                    <Card.Text > D-{(new Date(data.wl_date_end).getTime() - new Date(data.wl_date_start).getTime())/ (1000*60*60*24)}</Card.Text>
                                    <Card.Text style={{gridRow:'2/3', gridColumn:'2/6'}}>세부 업무 :  </Card.Text>
                                    <Card.Text style={{ gridRow:'2/3', gridColumn:'3/5'}}> {data.wl_work_detail}</Card.Text>
                                    
                                    <div style={{ borderRadius:'10px',backgroundColor:'#007bbc', height:'22px' ,width:'40px', gridRow:'2/3', gridColumn:'1/2', marginTop:'-4px'}}>
                                            <b><p style={{color:'yellow', fontSize:'14px',paddingLeft: "11px"}}>{data.wl_id}</p></b>
                                    </div> 
                                </Card>
                        )
                    })
                    :
                    <p style={{textAlign:'center', paddingTop:"100px"}}> 등록할 수 있는 업무가 없습니다. </p>}

                </div>
            </div>:
            <div style={{height : '220px', marginTop:'20px'}}>
                <b style={{paddingLeft:'36px', }}>Commit 코멘트 조회</b>
                <div style={{ padding :'10px', marginTop:'20px', marginLeft : '40px', height : '160px', width:'530px', backgroundColor:'white'  }}>{comment} </div>
            </div>
            }
        </div>
        
    )
}

export default CommitWorkList

/**
 * 
                            {data.wl_done==2? 
                                <div style={{  gridRow:'2/3', gridColumn:'1/2', marginTop:'-5px'}}>
                                    <button disabled style={{  backgroundColor:'gray', height:'25px' ,width:'50px', }}>
                                        <b><p style={{color:'yellow', fontSize:'14px',paddingTop:"px"}}>승인 중</p></b>
                                    </button> 
                                </div> :
                                <div style={{  gridRow:'2/3', gridColumn:'1/2', marginTop:'-7px'}}>
                                    <button onClick style={{  backgroundColor:'gray', height:'30px' ,width:'50px', borderRadius:'10px'}}>
                                        <p style={{color:'white', fontSize:'13px',paddingTop:"2px"}}>승인요청</p>
                                    </button>   
                                </div>
                            }   
 */