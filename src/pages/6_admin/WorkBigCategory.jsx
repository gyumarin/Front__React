import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styles from './WorkBigCategory.module.css';


const WorkBigCategory = ({wlb, setWlb, setBigCategoryId, setMidCategoryId, renewalDetails, bigCategoryId, midCategoryId, setBigCategoryName}) => {   
       
    // state
    const newBigCategory = useRef("");
    const [idCheck, setIdCheck] = useState(10000000)

    useEffect(() => {
        console.log(idCheck);
    }, [idCheck])

    // Method
    const openMiddleCategory =(event)=>{
        event.preventDefault();  
        const midCategoryId = event.target.id;  
        setBigCategoryId("0");       
        setMidCategoryId(midCategoryId); 
        setBigCategoryName(event.target.innerText);
        renewalDetails();
        setIdCheck(event.target.id);
    } 

    const onCreateNewBigCategory=(event)=>{
        event.preventDefault();
        if(newBigCategory.current.value ==""){ 
            alert("카테고리의 이름을 지정해 주세요.")
        }else if (
            wlb.filter(value => newBigCategory.current.value == value.c_name)
                .length !== 0
        ) {
            alert("이미 등록된 카테고리 입니다.");
        }
        else{
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
                            if(idCheck==c.c_id){
                                <div 
                                    id={c.c_id}
                                    className={styles.cardbig} 
                                    onClick={openMiddleCategory}
                                >{c.c_name}
                                </div>
                            }
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