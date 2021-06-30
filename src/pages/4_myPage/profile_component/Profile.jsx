import React, { useRef, useState } from 'react';
import styles from './Profile.module.css';
import ToggleButton from 'react-toggle-button'
import PwdPopup from './PwdPopup';

const Profile = (props) => {
    const ref = useRef("");

    const [self, setSelf] = useState({value : false})   
    const [popup, setPopup] = useState(false);

    const name = "박진목";

    const togglePopup=(event)=> {
        event.preventDefault();
        setPopup(!popup);
      }    
    console.log(ref.current.value);

    return(
        <div className={styles.container}>
            <div className={styles.title}>프로필</div>
            {/* <p className={styles.para}>해당 어플리케이션 내 프로필을 수정하실 수 있습니다.</p> */}

        <div className={styles.forms}>
            <div className={styles.toggleContainer}>
                <p className={styles.text}>수정</p>                
                <ToggleButton 
                    value={ self.value || false }

                    onToggle={(value) => {
                        setSelf({value: !value})
                    }} 
                />                
            </div>
            <form className ={styles.table} action="">
                <table>
                    <tr>
                        <td>사원명</td>
                        <td><input ref={ref} className={styles.form}  type="text" defaultValue={name} disabled/></td>
                    </tr>
                    <tr>
                        <td>사원번호</td>
                        <td><input className={styles.form}  type="text" defaultValue="102022" disabled/></td>
                    </tr>
                    <tr>
                        <td>부서</td>
                        <td><input className={styles.form}  type="text" defaultValue="개발 1팀" disabled/></td>
                    </tr>
                    <tr >
                        <td>직책</td>
                        <td><input className={styles.form}  type="text" defaultValue="사원" disabled/></td>
                    </tr>
                    
                    <tr>
                        <td>비밀번호</td>
                        <td >
                            <button 
                                className={self.value ? styles.pwdButton : styles.pwdButton2} 
                                onClick={togglePopup} 
                                disabled={!self.value?"disabled":null}>
                                    비밀번호 변경
                            </button>     
                        </td>
                    </tr>

                    <tr>
                        <td >별명</td>
                        <td><input className={styles.form}  type="text" defaultValue="제임스" disabled={!self.value} /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input className={styles.form}  type="email" defaultValue="rbalsd1008@naver.com"disabled={!self.value} /></td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>                            
                            <input className={styles.form}  type="text" defaultValue="부산광역시 해운대구 센텀2로"disabled={!self.value} />                   
                        </td>
                    </tr>
                    <tr>
                        <td>휴대전화</td>
                        <td><input  className={styles.form} type="text" defaultValue="010-2002-2002" disabled={!self.value} /></td>
                    </tr>
                    <tr>
                        <td>내선전화</td>
                        <td><input  className={styles.form} type="text" defaultValue="2030-2002" disabled={!self.value} /></td>
                    </tr>
                    <tr>
                        <td >하고 싶은 말(선택)</td>
                        <td>
                            <textarea className={styles.form}  name="textbox" id="textbox" cols="50" rows="5"disabled={!self.value} ></textarea>
                        </td>    
                    </tr>
                </table>
                {
                    self.value ? 
                    <div className={styles.buttons}>
                        <input className={styles.submit}type='submit' value="적용"></input>
                        <input className={styles.reset}type="reset" value="취소" />
                    </div>
                    :
                    null
                }
            </form>        
        </div>
        {
            popup? 
            <PwdPopup/>
            : null
        }
    </div>
    );
};

export default Profile;