import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import { login } from '../../../Data/getAPI/employee';

const Login = (props) => {
    ssss;
    const [empID, setEmpID] = useState('');
    const [empPWD, setEmpPWD] = useState('');

    const history = useHistory();

    const onChangeID = useCallback((e) => {
        setEmpID(e.target.value);
    }, []);

    const onChangePWD = useCallback((e) => {
        setEmpPWD(e.target.value);
    }, []);

    const onLogin = (event) => {
        login(empID, empPWD).then((res) => {
            if (res.code == 500) {
                alert('ID 또는 비밀번호를 다시 확인해 주세요.');
            } else {
                sessionStorage.setItem('token', JSON.stringify(res));
                history.push('/home');
            }
        });

        event.preventDefault();
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
                    <Form.Control type="password" value={empPWD} placeholder="비밀 번호" onChange={onChangePWD} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onLogin}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
