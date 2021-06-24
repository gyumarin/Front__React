import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';

const Login = (props) => {
  const history = useHistory();
  const onLogin =event=>{
    event.preventDefault();
    history.push("/home");
  } 

  return(
    <div className={styles.container}>
      <style type="text/css">{`.btn-primary {width: 100%;}`}</style>
      <img className={styles.logo} src="./images/douzone_logo.png" alt="DOUZONE LOGO" />
      <Form className={styles.form}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" placeholder="사원 번호" />
          
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="비밀 번호" />
        </Form.Group>          
        <Button variant="primary" type="submit" onClick={onLogin}>Login</Button>
      </Form>
    </div>
  );
};

export default Login;