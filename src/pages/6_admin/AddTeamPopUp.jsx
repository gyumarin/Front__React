import React from 'react';
import styles from './AddTeamPopUp.module.css';

const AddTeamPopUp = (props) => {

    const handleClick =(event)=>{
        event.preventDefault();
        props.setTeamPopup(false);
    }

    return(
        <div className ={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>인원 추가</h1>
            <button onClick ={handleClick} className={styles.exit}><i className="fas fa-times"></i></button>
        </div>
        
        <form action="get">            
            
            <label className={styles.label} htmlFor="input">인원 검색</label>
            <div>
                {/* search 들어올 곳 */}
            </div>
            <input className={styles.button1} type="button" value="추가"/>           
        </form>
    </div>
    );
};

export default AddTeamPopUp;