import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { useEffect } from 'react';

export function login(userID, pwd) {
  console.log(userID, pwd);
    return 
}

const Login = ({getLoginToken}) => {
    const [empID, setEmpID] = useState('');
    const [empPWD, setEmpPWD] = useState('');
    const history = useHistory();

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

    useEffect(()=>{
        axios
        .get('employee/list')
        .then((response) => {console.log(response)});        
    },[])    

    const onLogin = (event) => {        
      event.preventDefault();      
      sessionStorage.setItem('token', 'testtoken');
      getLoginToken(sessionStorage.getItem('token'));   
      history.push('/main/home');
    };

    return (
        <div className={styles.container}>
            <style type="text/css">{`.btn-primary {width: 100%;}`}</style>
            <img className={styles.logo} src="./images/douzone_logo.png" alt="DOUZONE LOGO" />
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