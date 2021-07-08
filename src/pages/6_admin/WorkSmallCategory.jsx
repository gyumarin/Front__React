import axios from 'axios';
import { even } from 'check-types';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './WorkSmallCategory.module.css';

const WorkSmallCategory = ({wld, setWld,  smallCategoryId, bigCategoryName, midCategoryName, peopleList}) => {
    console.log(bigCategoryName, midCategoryName);
    const param = useParams();
    const projectId = parseInt(param.id);
    // state
    const [onInput, setOnInput] = useState(false);
    const newDetail = useRef("");
    const startTime = useRef("");
    const EndTime = useRef("");
    const charges = useRef("");

    // method
    const smallCategoryData = wld.filter(item=>{
        return item.m_id == smallCategoryId;
        }            
    );
    
    const onChangeInputForm =(event)=>{
        event.preventDefault();
        setOnInput(true);
    }
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
        setOnInput(false);
    }

// ---------------------------------------------------------------------
    return(
        <div className={styles.container}>
            <div className={styles.title}>Detail</div>   
            <div className={styles.content}>
            {                                    
                smallCategoryData.map(item=>{
                    return(
                        <div className={styles.list} id ={item.d_id} >{item.d_name} | {item.d_start}~ {item.d_end} | {item.d_charge}</div>
                    );
                })
            }
            {   
                onInput ? 
                    <form action="get" onSubmit={onCreateNewDetails} className={styles.formContainer}>

                        <div className={styles.formTitle}>
                            <label className={styles.label} htmlFor="title">업무명</label>
                            <input ref={newDetail} id="title" className={styles.inputTitle} type="text" placeholder="업무명" id="" autoFocus />
                        </div>                        

                        <div className={styles.formDate}>
                            <div className={styles.dateContainer}>
                                <label className={styles.label} htmlFor="start">시작일</label>
                                <input ref = {startTime} className={styles.inputDate} id="start" type="date" placeholder="세부 업무" autoFocus />
                            </div>
                            <div className={styles.dateContainer1}>
                                <label className={styles.label} htmlFor="end">마감일</label>
                                <input ref={EndTime} className={styles.inputDate} type="date" placeholder="세부 업무" autoFocus />
                            </div>
                        </div>

                        <div className={styles.formCharge}>
                            <label className={styles.label} htmlFor="charge">담당자</label>
                            {/* <input ref={charges} id="charge" className={styles.inputCharge} type="text" placeholder="담당자" autoFocus /> */}
                            <select name="" id="">
                                {
                                    peopleList.map(man=>{
                                        <option value={man.e_name} id={man.e_id}>man.e_name</option>
                                    })
                                }
                            </select>
                        </div>
                        <input type="button" onClick={onCreateNewDetails} value="등록" className={styles.button}/>
                    </form>
                : <div className={styles.addButton} onClick={onChangeInputForm}><i className="fas fa-plus"></i></div>                
            }  
            </div>
        </div>
    );
};

export default WorkSmallCategory;