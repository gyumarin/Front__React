import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import logo from '../../../images/douzone_logo_1.png';

const Login = ({getLoginToken}) => {

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            history.push('/main/home');
        }
      }, [])

    const history = useHistory();
    const [empID, setEmpID] = useState('');
    const [empPWD, setEmpPWD] = useState('');    
      
    //////////////////////////////////////////////////////////////////
    const onChangeID = useCallback((e) => {
        switch (e.target.id) {
            case 'formBasicEmail':
                setEmpID(e.target.value);
                break;
            case 'formBasicPassword':
                setEmpPWD(e.target.value);
                break;
        }
    }, []); 
    
    //////////////////////////////////////////////////////////////////
    const onLogin = (event) => {
        event.preventDefault();
        axios.post('/employee/signin', {
            e_id: empID,
            e_password: empPWD,
        })
        .then((res) => {
            if (res.data.code == 500) {
                alert('ID 또는 비밀번호를 다시 확인해 주세요.');
            } else {
                sessionStorage.setItem('token', JSON.stringify(res.data.result));
                sessionStorage.setItem('isAdmin', false);
                getLoginToken(sessionStorage.getItem('token'))
                history.push('/main/home');
                alert('로그인 되었습니다.')
            }
        })        
    };

    return (
        <div className={styles.container}>
            <style type="text/css">{`.btn-primary {width: 100%;}`}</style>
            <img className={styles.logo} src={logo} alt="DOUZONE LOGO" />
            <Form className={styles.form}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" value={empID} placeholder="사원 번호" onChange={onChangeID} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={empPWD} placeholder="비밀 번호" onChange={onChangeID} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onLogin}>Login</Button>
            </Form>
        </div>
    );
};

export default Login;