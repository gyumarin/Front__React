import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';

import styles from './TeamHistoryPopUp.module.css';

const TeamHistoryPopUp = ({peopleList, setTheirHistory, teamId}) => {

    const [thisMan, setThisMan] = useState({});
    const [dProjects, setDProjects] =useState([]);
    const [uProjects, setUProjects] =useState([]);
    const[isDone, setIsDone ] =useState(false);
    
    useEffect(()=>{
        setThisMan(thisMan => peopleList.find(team =>{            
            return  team.ep_id == teamId
          }))
    },[])

    useEffect(()=>{
        axios.get(`/project/emp/list/${thisMan.e_id}`).then(res=>{            
            setDProjects(res.data.result.projectDone);
            setUProjects(res.data.result.projectUndone);            
        })
    },[thisMan]);

const onExit = (event)=>{
    event.preventDefault();
    setTheirHistory(false);    
}
const switchMode = (event)=>{
    event.preventDefault();
    setIsDone(!isDone);
}

    return(
        <>
        <div className={styles.container}></div>
        <div className={styles.card}>
            <div className={styles.header}>
               {thisMan&& <div className={styles.title}><span className={styles.name}>{thisMan.e_name}</span>사원정보</div>}
                <button className={styles.exit} onClick={onExit}><i className="fas fa-times-circle"></i></button>
            </div>   
            <div className={styles.contents}>
                <div className={styles.text}>
                    <div className={styles.text1}>
                        <div>{thisMan.d_name}</div> 
                        (<div>{thisMan.e_rank}</div>)                        
                    </div>
                    <div className={styles.tel}>Tel. {thisMan.e_e_phone}</div>
                    <div className={styles.text2}> </div>
                </div>
                <img className = {styles.photo} src={thisMan.e_photo} alt="사원 사진" />
            </div> 
            
            <BarChart 
            key= "1"
             uProjects={uProjects}
             thisMan={thisMan}
            />
            {!isDone 
            ? <button className={styles.toggle} onClick ={switchMode}>진행 중인 프로젝트</button>
            :<button className={styles.toggle} onClick ={switchMode}>완료 프로젝트</button>}

            <div style={{width:'40px', backgroundColor:"aliceblue", textAlign:'center', color:"#263238", position:"relative", left:"195px", bottom:"50px", marginBottom:"-2.5em"}}>{!isDone ? uProjects.length: dProjects.length}건</div>
            <div className={styles.list}>                
                {     
                !isDone?           
                    uProjects.map(p =>{
                        return (
                            <div className={styles.li}>
                                <div style={{fontSize:"0.9em", marginBottom:"0.5em", fontWeight:"bolder", textAlign :'right'}}>
                                    프로젝트 명 : <font style={{fontWeight:'normal'}}>{p.p_title}</font> 
                                    <div > </div>  
                                    </div>
                                <hr  style={{marginTop:"-0.5em", marginBottom:"0.3em", }}/>
                                <font style={{fontSize:'0.7em',}}>수행 기간 : {p.p_date_start}  ~ {p.p_date_end}</font>
                                <div style={{fontSize: "0.7em"}}>포지션 : {p.ep_position}</div>
                                <div className={styles.dates}> 
                                    
                                </div>
                            </div>
                        );
                    })
                    :
                    dProjects.map(p =>{
                        return (
                            <div className={styles.li}>
                                <div style={{fontSize:"0.9em", marginBottom:"0.5em", fontWeight:"bolder", textAlign :'right'}}>
                                    프로젝트 명 : <font style={{fontWeight:'normal'}}>{p.p_title}</font> 
                                    <div > </div>  
                                    </div>
                                <hr  style={{marginTop:"-0.5em", marginBottom:"0.3em", }}/>
                                <font style={{fontSize:'0.7em',}}>수행 기간 : {p.p_date_start}  ~ {p.p_date_end}</font>
                                <div style={{fontSize: "0.7em"}}>포지션 : {p.ep_position}</div>
                                <div className={styles.dates}> 
                                    
                                </div>
                            </div>
                        );
                    })

                }   
            </div>
        </div>
        </>
    );
}

export default TeamHistoryPopUp;