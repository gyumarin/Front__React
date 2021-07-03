import React, { useEffect, useState } from 'react';
import styles from  './PwdPopup.module.css';
import axios from 'axios';

const PwdPopup = ( {setSelf, setPopup} ) => {

    const [pwdInfo, setPwdInfo] = useState({
        nowPwd : '',
        newPwd : '',
        newPwdCheck : '',
    })

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setPwdInfo({
          ...pwdInfo, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    // useEffect(() => {
    //     console.log(pwdInfo)
    // }, [pwdInfo])

    const onChangePwd = (event)=>{
        event.preventDefault();
        console.log('이제 바꿉니다.',pwdInfo)
        var tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);

        var result = axios.put('employee/detail/pwd', {
            token: tmp,
            e_password: pwdInfo.newPwd,
            //비밀번호 변경로직
            //현재 비밀번호 정보랑 새 비밀번호 정보를 둘다 보내서 
            //현재 비밀번호 입력한 값과 실제 비밀번호를 대조하고 맞으면 변경 해야한다.
            //그리고 현재 비밀번호와 새 비밀번호가 동일하면 처리되지 않을지 고민해봐야한다.
        })
        
        // if(result.data.code==200){          //<-제대로 요청이오면 이거롤 변경해야한다.
        if(pwdInfo.nowPwd=='yes'){
            alert('비밀번호를 성공적으로 변경하였습니다.');
            setSelf();
            setPopup();
        }else{
            alert('비밀번호 변경에 실패했습니다.');
            setPwdInfo({
                nowPwd : '',
                newPwd : '',
                newPwdCheck : '',
            })
        }
        
    }


    return(
        <div className={styles.container} style={{paddingTop:'400px'}}>
           <h5 className={styles.title}>비밀번호 변경</h5>             
           <p className={styles.warn1}>안전한 비밀번호로 내 정보를 보호하세요</p>
           <p className={styles.warn2}>- 다른 아이디/사이트에서 사용한 적 없는 비밀번호</p>
           <p className={styles.warn2}>- 이전에 사용한 적 없는 비밀번호가 안전합니다.</p>
           <form onSubmit={onChangePwd}>
               <table className={styles.inputs}>
                <tr>
                    <input className={styles.input}  type="password" placeholder="현재 비밀번호" value={pwdInfo.nowPwd} name="nowPwd" onChange={onChange}/>
                   
                </tr>
                <tr>
                    <input className={styles.input}  type="password" placeholder="새 비밀번호" value={pwdInfo.newPwd} name="newPwd" onChange={onChange}/>
                </tr>
                <tr>
                    <input className={styles.input}  type="password" placeholder="새 비밀번호 확인" value={pwdInfo.newPwdCheck} name="newPwdCheck" onChange={onChange}/>
                    {(pwdInfo.newPwdCheck!='')&&((pwdInfo.newPwd==pwdInfo.newPwdCheck)?'사용가능':'비밀번호가 일치하지 않습니다.')}
                </tr>

                <tr>{(pwdInfo.nowPwd!=''&&pwdInfo.newPwd!=''&&pwdInfo.newPwdCheck!=''&&(pwdInfo.newPwd==pwdInfo.newPwdCheck)&&<input className={styles.button1} type="submit" value="확인" disabled={false} onClick={onChangePwd}/>)}</tr>
                <tr><input className={styles.button2} type="reset" value="취소" onClick={()=>{setSelf();setPopup()}}/></tr>
               </table>
           </form>
           <div className={styles.lock}>
            <i className="fas fa-lock"></i>
           </div>
        </div>
    );
}

export default PwdPopup;


