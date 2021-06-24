import './App.css';
import LoginPage from './pages/0_login/LoginPage';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import BasicPage from './pages/1_home/BasicPage';
import ProjectListPage from './pages/2_project/ProjectListPage';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [loginToken, setLoginToken] = useState('');

  const getLoginToken =()=>{
    setLoginToken(sessionStorage.getItem('token'));
    console.log('로그인 버튼 동작');
    console.log(loginToken);
  }  

  return (
    <div className='body'>
      
      <BrowserRouter>
        <Switch>
          {/* 0. 로그인 창 */}
          <Route exact path="/">
            <LoginPage 
              getLoginToken = {getLoginToken}
            />
          </Route>          
          {/* 1. 홈페이지 창 */}
          <Route path="/main"><BasicPage/></Route>         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
