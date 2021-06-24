import './App.css';
import LoginPage from './pages/0_login/LoginPage';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import HomePage from './pages/1_home/HomePage';

function App() {
  return (
    <div className='body'>
      <BrowserRouter>
        <Switch>
          {/* 0. 로그인 창 */}
          <Route exact path="/"><LoginPage/></Route>
          {/* 1. 홈페이지 창 */}
          <Route path="/home"><HomePage/></Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
