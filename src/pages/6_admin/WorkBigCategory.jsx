import React, { useRef } from 'react';
import { useState } from 'react';
import styles from './WorkBigCategory.module.css';


const WorkBigCategory = ({wlb, setWlb, setBigCategoryId, setMidCategoryId, renewalDetails, bigCategoryId, midCategoryId, setBigCategoryName}) => {   
    // state
    const [onInput, setOnInput] = useState(false);
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

    const onChangeInputForm = (event)=>{
        event.preventDefault();
        setOnInput(true);
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
        event.target.querySelector('input').value = "";
        setOnInput(false);
    }

    // ------------------------------------------------------------------------------------ 
    
    return(
        <div className={styles.container}>
            <div className={styles.title}>Category</div>
            <div className={styles.content}>
                {
                    wlb.map(c =>{
                        return(
                            <div 
                                className={midCategoryId == c.m_id? bigCategoryId == c.c_id ? styles.doubleSelectdCard : styles.selectedCard : styles.card} 
                                id ={c.c_id} 
                                onClick={openMiddleCategory}
                            >{c.c_name}
                            </div>
                        );
                    })
                }
                {   
                    onInput ? 
                    <form action="get" onSubmit={onCreateNewBigCategory}>
                        <input ref={newBigCategory} className={styles.input} type="text" placeholder="대분류" autoFocus />
                    </form>
                    : <div className={styles.addButton} onClick={onChangeInputForm}><i className="fas fa-plus"></i></div>
                }                                    
            </div>                                
        </div>
    );
};

export default WorkBigCategory;