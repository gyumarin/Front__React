import './App.css';
import LoginPage from './pages/0_login/LoginPage';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import BasicPage from './pages/1_home/BasicPage';
import { useState } from 'react';

function App() {

  const [loginToken, setLoginToken] = useState('');
  const getLoginToken =()=>{setLoginToken(sessionStorage.getItem('token'));}
  const removeLoginToken =()=>{setLoginToken('');}

  return (
    <div className='body'>
      
      <BrowserRouter>
        <Switch>
          {/* 0. 로그인 창 */}
          <Route exact path="/">
            <LoginPage 
              getLoginToken = {()=>getLoginToken()}
            />
          </Route>      

          {/* 1. 홈페이지 창 */}
          <Route path="/main">
            <BasicPage
            removeLoginToken = {()=>removeLoginToken()}
          /></Route>         
        </Switch>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
