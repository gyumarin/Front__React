import React, { useRef } from 'react';
import { useState } from 'react';
import styles from './WorkBigCategory.module.css';


const WorkBigCategory = ({wlb, setWlb, setBigCategoryId, setMidCategoryId, renewalDetails, bigCategoryId, midCategoryId, setBigCategoryName}) => {   
       
    // state
    const newBigCategory = useRef("");

    // Method
    const openMiddleCategory =(event)=>{
        event.preventDefault();  
        const midCategoryId = event.target.id;  
        setBigCategoryId("0");       
        setMidCategoryId(midCategoryId); 
        setBigCategoryName(event.target.innerText);
        renewalDetails();
    } 

    const onCreateNewBigCategory=(event)=>{
        event.preventDefault();
        const copied = [...wlb];
        const newCategory = {
            "c_id" : new Date().getTime(),
            "c_name" : newBigCategory.current.value     
        }        
    
        copied.push(newCategory);        
        setWlb(copied);
        setMidCategoryId(newCategory.c_id);
        newBigCategory.current.value = "";
    }

    // ------------------------------------------------------------------------------------ 
    
    return(
        <div className={styles.container}>
            <div className={styles.title}>카테고리</div>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    <form action="get" onSubmit={onCreateNewBigCategory}>
                        <input ref={newBigCategory} className={styles.input} type="text" placeholder="대분류" autoFocus />
                    </form>
                    <div className={styles.addButton} onClick={onCreateNewBigCategory}><i className="fas fa-plus"></i></div>
                </div>
                <div className={styles.categoryBox}>
                    {
                        wlb.map(c =>{
                            return(
                                <div 
                                    id={c.c_id}
                                    className={styles.card} 
                                    onClick={openMiddleCategory}
                                >{c.c_name}
                                </div>
                            );
                        })
                    }         
                </div>                                       
            </div>                                
        </div>
    );
};

export default WorkBigCategory;