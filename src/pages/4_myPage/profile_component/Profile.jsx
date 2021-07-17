import React, { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.css';
import ToggleButton from 'react-toggle-button'
import PwdPopup from './PwdPopup';
import axios from 'axios';
const Profile = (props) => {
    const [self, setSelf] = useState( false)   
    const [popup, setPopup] = useState(false);
    const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
    if(sessionStorage.getItem('token')){
      axios.get(`/employee/detail`,{headers: {
        'token': tmp
      }}).then(res=>{
        setUserInfo(res.data.result);
        console.log(res.data.result);
      })      
    }
  }, [])
  
    const togglePopup=(event)=> {
        event.preventDefault();
        setPopup(!popup);
      }    
    // console.log(ref.current.value);

    const onUpdateInfo=(event)=>{
        event.preventDefault();
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        axios.put('/employee/detail', {
            token: tmp,
            e_p_phone: userInfo.e_p_phone,
            e_e_phone: userInfo.e_e_phone,
            e_email: userInfo.e_email,
            e_address: userInfo.e_address,
            e_nickname: userInfo.e_nickname,
            e_comment : userInfo.e_comment,
        })
        .then((res) => {console.log(res)});
        setSelf(false);
    }

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setUserInfo({
          ...userInfo, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };

    return(
        <div className={styles.container}>
            <div className={styles.title}>프로필</div>
            {/* <p className={styles.para}>해당 어플리케이션 내 프로필을 수정하실 수 있습니다.</p> */}

        <div className={styles.forms}>
            <div className={styles.toggleContainer}>
                <p className={styles.text}>수정</p>                
                <ToggleButton 
                    value={ self || false }

                    onToggle={(value) => {
                        setSelf(!value)
                        setPopup(popup ? !popup : popup)
                    }} 
                />                
            </div>
            <form className ={styles.table} onSubmit={onUpdateInfo}>

                <div className={styles.fixed}>나의 정보</div>
                <hr className={styles.line}/>
                <table>
                    
                        
                        <tr className={styles.tr1}>
                            <td className={styles.td}>사원명</td>
                            <td className={styles.td2}>{userInfo.e_name}</td>
                        </tr>
                        <tr className={styles.tr1}>
                            <td className={styles.td}>사원번호</td>
                            <td className={styles.td2}>{userInfo.e_id}</td>
                        </tr>
                        <tr className={styles.tr1}>
                            <td className={styles.td}>부서</td>
                            <td className={styles.td2}>{userInfo.d_name}</td>
                        </tr>
                        <tr className={styles.tr1} >
                            <td className={styles.td}>직책</td>
                            <td className={styles.td2}>{userInfo.e_rank} </td>
                        </tr>
                </table> 
                <div className={styles.flexible}>개인정보 수정</div>
                <hr className={styles.line}/>
                <table>
                        <tr>
                        <td className={styles.td}>비밀번호</td>
                        <td >
                            <button 
                                className={self ? styles.pwdButton : styles.pwdButton2} 
                                onClick={togglePopup} 
                                disabled={!self?"disabled":null}>
                                    비밀번호 변경
                            </button>     
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.td} >Git 계정명</td>
                        <td><input className={styles.form}  type="text" value={userInfo.e_nickname}
                        name="e_nickname" 
                        disabled={!self} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td className={styles.td}>이메일</td>
                        <td><input className={styles.form}  type="email" value={userInfo.e_email}
                        name="e_email" 
                        disabled={!self} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td className={styles.td}>주소</td>
                        <td>                            
                            <input className={styles.form}  type="text" value={userInfo.e_address}
                            name="e_address" 
                            disabled={!self} onChange={onChange}/>                   
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>휴대전화</td>
                        <td><input  className={styles.form} type="text" value={userInfo.e_p_phone}
                        name="e_p_phone" 
                        disabled={!self} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td className={styles.td}>내선전화</td>
                        <td><input  className={styles.form} type="text" value={userInfo.e_e_phone}
                        name="e_e_phone" 
                        disabled={!self} onChange={onChange}/></td>
                    </tr>                    
                    <div className={styles.td5} >하고 싶은 말  </div>                               
                    <tr>
                        <td></td>
                        <td>
                            <textarea className={styles.form5}  value={userInfo.e_comment} name="e_comment" 
                             cols="50" rows="8"disabled={!self} onChange={onChange}></textarea>
                        </td>    
                    </tr>
                </table>
                {
                    self&& 
                    <div className={styles.buttons}>
                        <button className={styles.submit}type='submit' onClick={onUpdateInfo} >적용</button>
                        <button className={styles.reset}type="reset" onClick={()=>setSelf(false)}>취소</button>
                    </div>
                    
                }
            </form>        
        </div>
        {
            self&&(
            popup&&<PwdPopup setSelf={()=>setSelf(false)} setPopup={()=> setPopup(false)}/>)
        }
    </div>
    );
};

export default Profile;