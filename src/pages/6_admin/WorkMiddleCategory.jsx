import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styles from './WorkMiddleCategory.module.css';


const WorkMiddleCategory = ({wlm, midCategoryId,setWlm,setBigCategoryId,setSmallCategoryId, smallCategoryId, setMidCategoryName}) => {
    // state
    const newMiddleCategory=useRef("");

    const midCategoryData = wlm.filter(item=>{
            // console.log(item);
            return item.c_id == midCategoryId;
        }            
    );
        
    // method
    const openDetailCategory =(event)=>{
        event.preventDefault();
        const smallCategoryId = event.target.id; 
        // console.log(smallCategoryId);
        setSmallCategoryId(smallCategoryId); 
        setBigCategoryId(midCategoryId);
        // console.log(event.target.innerText);
        setMidCategoryName(event.target.innerText);
    };
    
  
    const onCreateNewMiddleCategory =(event)=>{
        event.preventDefault();
        if(newMiddleCategory.current.value ==""){ 
            alert("업무를 작성해 주세요.")
        }else{
            const copied = [...wlm];
            const newCategory = {
                "c_id" : midCategoryId,
                "m_id" : new Date().getTime(),
                "m_name" : newMiddleCategory.current.value               
            }      

            copied.push(newCategory);        
            setWlm(copied);
            newMiddleCategory.current.value = "";
        }
        
    }

    // ---------------------------------------------------------------------------

    return( 
    
    <div className={styles.container}>
        <div className={styles.title}>업무</div>   
        <div className={styles.content}>
        <div className={styles.inputs}>    
            <form action="get" onSubmit={onCreateNewMiddleCategory}>
                <input ref={newMiddleCategory} className={styles.input} type="text" placeholder="중분류" autoFocus />
            </form>
            <div className={styles.addButton} onClick={onCreateNewMiddleCategory}><i className="fas fa-plus"></i></div>          
          </div>
          <div className={styles.categoryBox}>
          {                                    
              midCategoryData.map(item=>{
                  return(
                      <div
                        id = {item.m_id}                        
                        className={styles.card} 
                        onClick={openDetailCategory}
                      >{item.m_name}
                      </div>
                  );
              })
          }
          </div>
        </div>
      </div>
);
};

export default WorkMiddleCategory;