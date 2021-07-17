import React from 'react';
import MiniProfile from './MiniProfile';
import NavList from './NavList';
import NavListAdmin from './NavListAdmin'

import { useState, useEffect } from 'react';
import styles from './LeftNavBar.module.css';
import { useHistory } from 'react-router-dom';

import axios from 'axios';


const LeftNavBar = ({removeLoginToken}) => {

  const [userInfo, setUserInfo] = useState({})
  const [test, setTest] = useState(false)
  const history = useHistory();

  
  useEffect(() => {

    //로그인 상태면 로그인 유저 정보를 가져온다.
    const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    if(sessionStorage.getItem('token')){
      axios.get(`/employee/detail`,{headers: {
        'token': tmp
      }}).then(res=>{
        setUserInfo(res.data.result);
      })      
    }
    
  }, [])
  

  //모드 변경 버튼을 클릭했을 때
  const handleClick = async (event) =>{
    event.preventDefault();    
    const modeChangeCheck = sessionStorage.getItem("isAdmin")=="false"? window.confirm("관리자 창으로 이동하시겠습니까?") : window.confirm("사용자 창으로 이동하시겠습니까?");
    
    
    //해당창으로 이동하겠다로 처리했다면
    if(modeChangeCheck==true){
      //현재 사용자 창이면,
      if(sessionStorage.getItem('isAdmin') == "false"){
         await sessionStorage.setItem("isAdmin", true);
         await setTest(true);
         await history.push("/main/admin/project");
      }else{
        await sessionStorage.setItem("isAdmin", false);
        await setTest(false);
        await history.push("/main/home");
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
        {sessionStorage.getItem('isAdmin') == "false" ? 
        <NavList /> 
        : 
        <NavListAdmin/>
        }
      </div>
      { userInfo.role == "admin"?
      <div className={styles.toggle}>
        <div className={styles.title} >관리자</div>         
        
        { 
          sessionStorage.getItem("isAdmin")=="false" ? 
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