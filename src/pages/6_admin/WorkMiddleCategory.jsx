import React, { useRef } from 'react';
import { useState } from 'react';
import styles from './WorkMiddleCategory.module.css';


const WorkMiddleCategory = ({wlm, midCategoryId,setWlm,setBigCategoryId,setSmallCategoryId, smallCategoryId}) => {
    // state
    const [onInput, setOnInput] =useState(false);
    const newMiddleCategory=useRef("");

    const midCategoryData = wlm.filter(item=>{
            return item.c_id == midCategoryId;
        }            
    );
        
    // method
    const openDetailCategory =(event)=>{
        event.preventDefault();
        const smallCategoryId = event.target.id; 
        setSmallCategoryId(smallCategoryId); 
        setBigCategoryId(midCategoryId);
    };
    
    const onChangeInputForm =(event)=>{
        event.preventDefault();
        setOnInput(true);
    };

    const onCreateNewMiddleCategory =(event)=>{
        event.preventDefault();
        const copied = [...wlm];
        const newCategory = {
            "c_id" : midCategoryId,
            "m_id" : new Date().getTime(),
            "m_name" : newMiddleCategory.current.value               
        }      

        copied.push(newCategory);        
        setWlm(copied);
        event.target.querySelector('input').value = "";
        setOnInput(false);
    }

    // ---------------------------------------------------------------------------

    return( 
    
    <div className={styles.container}>
        <div className={styles.title}>Work</div>   
        <div className={styles.content}>
          {                                    
              midCategoryData.map(item=>{
                  return(
                      <div className={smallCategoryId == item.s_id? styles.selectedList : styles.list} 
                      id ={item.m_id} onClick={openDetailCategory}>{item.m_name}</div>
                  );
              })
          }
          {   
              onInput ? 
              <form action="get" onSubmit={onCreateNewMiddleCategory}>
                  <input ref={newMiddleCategory} className={styles.input} type="text" placeholder="중분류" autoFocus />
              </form>
              : <div className={styles.addButton} onClick={onChangeInputForm}><i className="fas fa-plus"></i></div>
          }  
        </div>
      </div>
);
};

export default WorkMiddleCategory;