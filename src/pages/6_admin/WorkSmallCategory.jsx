import axios from 'axios';
import { even } from 'check-types';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminWorkListCard from './AdminWorkListCard';
import styles from './WorkSmallCategory.module.css';

                          
const WorkSmallCategory = ({wld, setWld,  smallCategoryId, bigCategoryName, midCategoryName, selectedMan }) => {
    console.log(selectedMan);
    const param = useParams();
    const projectId = parseInt(param.id);
    // state
    const newDetail = useRef("");
    const startTime = useRef("");
    const EndTime = useRef("");
    const charges = useRef("");

    const [teamList, setTeamList] = useState([]); 
    const [charge, setCharge] = useState({});

    // method
    const smallCategoryData = wld.filter(item=>{
        return item.m_id == smallCategoryId;
        }            
    );    
    
    useEffect(()=>{
        axios.get(`/project/list/emp/${projectId}`)
        .then(res=>setTeamList(res.data.result));
    },[]);    
    
    useEffect(()=>{
        const selected = teamList.find(man =>{
            return man.e_id == selectedMan;
        })
        console.log(selected);
        setCharge(selected);
    },[selectedMan]);

    const onCreateNewDetails=(event)=>{
        event.preventDefault();
        const copied = [...wld];
        const newDetailData = {
            "m_id" : smallCategoryId,           
            "d_name" : newDetail.current.value == "" ? "세부업무 없음" : newDetail.current.value,
            "d_start" : startTime.current.value == "" ? "시작일 없음" : startTime.current.value,
            "d_end" : EndTime.current.value == "" ? "마감일 없음" : EndTime.current.value,
            "d_charge"  : charges.current.value == "" ? "담당자 없음" : charges.current.value
        }      
        axios.post("/project/work/insert",{
            p_id : projectId,
            wl_work_category : bigCategoryName,
            wl_work:  midCategoryName,
            wl_work_detail : newDetail.d_name,
            wl_date_start : newDetail.d_start,
            wl_date_end : newDetail.d_end,
            e_id : 1005
        })
        copied.push(newDetailData);        
        setWld(copied);
    }

// ---------------------------------------------------------------------
    return(
        <div className={styles.container}>
            <div className={styles.title}>세부업무 등록</div>   
            <div className={styles.content}>   
                <form action="get" onSubmit={onCreateNewDetails} className={styles.formContainer}>
                    <div className={styles.upper}>

                        <div className={styles.formCategory}>
                            <div style={{height:"50%", display:"flex"}}>
                                <div style={{fontWeight: "bold", marginTop : "0.5em", width:"30%", textAlign:"left"}}>카테고리 : </div> <div style={{marginTop : "0.5em", width:"100px",}}>{bigCategoryName}</div>
                            </div>
                            <div style={{height:"50%", display:"flex"}}>
                                <div style={{fontWeight: "bold", marginTop : "0.5em", width:"30%", textAlign:"left"}}>업무 : </div>  <div style={{marginTop : "0.5em", width:"100px",}}>{midCategoryName}</div>
                            </div>
                            
                        </div>

                        <div className={styles.formCharge}>
                            <label className={styles.lableCharge}>담당자</label> 
                            <div className={styles.selectedCharge}> 

                                <div className={styles.card}>                                
                                    <div className={styles.cardContents}>
                                        <div className={styles.text1}>{charge == null ? null : charge.ep_position}</div>
                                        <div className={styles.text2}>{charge == null ? null : charge.e_name}({charge == null ? null : charge.e_rank})</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formDate}>
                            <div className={styles.dateContainer}>
                                <label className={styles.label} htmlFor="start">시작일 :</label>
                                <input ref = {startTime} className={styles.inputDate} id="start" type="date" placeholder="세부 업무" autoFocus />
                            </div>
                            <div className={styles.dateContainer1}>
                                <label className={styles.label} htmlFor="end">마감일 :</label>
                                <input ref={EndTime} className={styles.inputDate} type="date" placeholder="세부 업무"  />
                            </div>
                        </div>
                    </div>             

                    <div className={styles.formDetails}>
                        <div className={styles.labelDetail} htmlFor="title">세부 업무</div>
                        <input ref={newDetail} id="title" className={styles.inputTitle} type="text" id=""  />
                        <input type="button" onClick={onCreateNewDetails} value="등록" className={styles.button}/>
                    </div>   
                </form>

                <div className={styles.workListTitle} htmlFor="title">업무 리스트 관리</div>
                <div className={styles.workList}>
                    {
                        [1,2,3,4,5].map(item=>{
                            return(
                                <AdminWorkListCard/>
                            )
                        })
                    }    
                    
                </div>                
           
                
            </div>
        </div>
    );
};

export default WorkSmallCategory;