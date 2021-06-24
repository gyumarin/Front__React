import React from 'react';
import Login from './login_components/Login.jsx'

const LoginPage = ({getLoginToken}) =>{
  return(
    <><Login
      getLoginToken ={getLoginToken}
    /></>
  );
}

export default LoginPage;