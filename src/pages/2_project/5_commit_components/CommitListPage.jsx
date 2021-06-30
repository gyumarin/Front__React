import React from 'react';
import styles from './CommitListPage.module.css';
import CommitTest from './CommitTest';

const CommitListPage = (props) => {

    const projectID = 5;
    return(
        
        <div className={styles.container} >
            
            <div style={{marginBottom:'-35px'}}>
            <h3 className={styles.h3}>SSG 휘트니스 서비스<font style={{marginLeft : '16px' ,fontSize:'18px', color : 'rgba(1, 1, 1, 0.3)'}}>커밋 리스트</font></h3>                
            </div>
            <div className={styles.listContainer} style={{paddingLeft: '40px'}}>
            <CommitTest />
           
           
            </div>
        </div> 
    );
};

export default CommitListPage;