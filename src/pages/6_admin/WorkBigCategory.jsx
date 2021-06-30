import React, { useRef } from 'react';
import { useState } from 'react';
import styles from './WorkBigCategory.module.css';


const WorkBigCategory = ({project, setProject, setBigCategoryId, setMidCategoryId, renewalDetails, bigCategoryId, midCategoryId}) => {   
    // state
    const [onInput, setOnInput] = useState(false);
    const newBigCategory = useRef("");

    // Method
    const openMiddleCategory =(event)=>{
        event.preventDefault();  
        const midCategoryId = event.target.id;  
        setBigCategoryId("0");       
        setMidCategoryId(midCategoryId); 
        renewalDetails();
    } 

    const onChangeInputForm = (event)=>{
        event.preventDefault();
        setOnInput(true);
    }
    const onCreateNewBigCategory=(event)=>{
        event.preventDefault();
        const copied = {...project};
        const newCategory = {
            "c_id" : new Date().getTime(),
            "c_name" : newBigCategory.current.value     
        }        
        copied.p_big_category.push(newCategory);        
        setProject(copied);
        event.target.querySelector('input').value = "";
        setOnInput(false);
    }

    // ------------------------------------------------------------------------------------ 

    return(
        <div className={styles.container}>
            <div className={styles.title}>Category</div>
            <div className={styles.content}>
                {
                    project.p_big_category.map(c =>{
                        return(
                            <div 
                                className={midCategoryId == c.c_id? bigCategoryId == c.c_id ? styles.doubleSelectdCard : styles.selectedCard : styles.card} 
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