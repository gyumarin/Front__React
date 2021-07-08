import React from 'react';
import MiniProfile from './MiniProfile';
import NavList from './NavList';

import { useState, useEffect } from 'react';
import styles from './LeftNavBar.module.css';
import { useHistory } from 'react-router-dom';

import axios from 'axios';


const LeftNavBar = ({removeLoginToken}) => {

  const [userInfo, setUserInfo] = useState({})
  
  useEffect(() => {
    if(mode == null){
      setMode(sessionStorage.getItem("isAdmin"))
    };
    const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    if(sessionStorage.getItem('token')){
      axios.get(`/employee/detail?token=${tmp}`).then(res=>{
        setUserInfo(res.data.result);
      })      
    }
  }, [])

  const history = useHistory();
  const [mode, setMode] = useState(null);   

  const handleClick = async (event) =>{
    event.preventDefault();    
    const modeChangeCheck = mode? window.confirm("관리자 창으로 이동하시겠습니까?") : window.confirm("사용자 창으로 이동하시겠습니까?");
    await sessionStorage.setItem("isAdmin", mode);
    await changeMode(modeChangeCheck);    
  }

  const changeMode =(modeChangeCheck)=>{    
    
    if(mode){// mode : 사용자
      if(modeChangeCheck){ // 관리자
        history.push("/main/admin/project");
        setMode(!mode);
      }
      else{               // 사용자
        setMode(mode);
      }
    }

    else{ // mode : 관리자
      if(modeChangeCheck){ // 사용자
        history.push("/main/home");
        setMode(!mode)
      }
      else{
        setMode(mode)
      }
    }
  }  

  return(
    <div className={sessionStorage.getItem('isAdmin') == "false" ? styles.container : styles.bossContainer} style ={{display:"grid", gridTemplateRows :"85% 15%"}}>
      <div>
      <MiniProfile 
        userInfo={userInfo}
        removeLoginToken={()=>removeLoginToken()}
      />
      <NavList/>
      </div>
      { userInfo.role == "admin"?
      <div className={styles.toggle}>
        <div className={styles.title}>관리자</div>         
        
        { 
          mode ? 
            <button 
              className={styles.button}     
              onClick={handleClick}     
            >OFF</button>
          : 
            <button 
              className={styles.button}     
              onClick={handleClick}     
            >ON</button>          
        }

      </div>
      : null
      }
    </div>
      
  );
};

export default LeftNavBar;