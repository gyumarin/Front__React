import { even } from 'check-types';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styles from './WorkSmallCategory.module.css';

const WorkSmallCategory = ({wld, setWld, smallCategoryId}) => {
    
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
            "d_id" : new Date().getTime(),
            "d_name" : newDetail.current.value,
            "d_start" : startTime.current.value,
            "d_end" : EndTime.current.value,
            "d_charge"  : charges.current.value
        }      
        copied.push(newDetailData);        
        setWld(copied);
        event.target.querySelector('input').value = "";
        setOnInput(false);
    }

    const detailsSubmit = (event)=>{
        event.preventDefault();
        const copied = [...wld];
        const newDetailData = {
            "m_id" : smallCategoryId,
            "d_id" : new Date().getTime(),
            "d_name" : newDetail.current.value == "" ? "세부업무 없음" : newDetail.current.value,
            "d_start" : startTime.current.value == "" ? "시작일 없음" : startTime.current.value,
            "d_end" : EndTime.current.value == "" ? "마감일 없음" : EndTime.current.value,
            "d_charge"  : charges.current.value == "" ? "담당자 없음" : charges.current.value
        }      
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
                            <input ref={charges} id="charge" className={styles.inputCharge} type="text" placeholder="담당자" autoFocus />
                        </div>
                        <input type="button" onClick={detailsSubmit} value="등록" className={styles.button}/>
                    </form>
                : <div className={styles.addButton} onClick={onChangeInputForm}><i className="fas fa-plus"></i></div>                
            }  
            </div>
        </div>
    );
};

export default WorkSmallCategory;