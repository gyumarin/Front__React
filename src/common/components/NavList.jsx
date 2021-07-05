import React, {useEffect} from 'react';
import styles from './NavList.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Accordion, Card} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const NavList = ({mode}) => {  
  const history = useHistory();

  // for User ---------------------------------------------------------
  const goHome =(event)=>{
    event.preventDefault();
    history.push("/main/home");
  }
  const goProject =(event)=>{
    event.preventDefault();
    history.push("/main/projectList");
  }
  const goNotice =(event)=>{
    event.preventDefault();
    history.push("/main/board/notice");
  }
  const goQna =(event)=>{
    event.preventDefault();
    history.push("/main/board/qna");
  }
  const goCompanyTree =(event)=>{
    event.preventDefault();
    history.push("/main/board/companyTree");
  }
  // for Admin ---------------------------------------------------------
  const goAdminProject =(event)=>{
    event.preventDefault();
    history.push("/main/admin/project");
  }
  
  const goAdminNotice =(event)=>{
    event.preventDefault();
    history.push("/main/admin/board/notice");
  }
  const goAdminQna =(event)=>{
    event.preventDefault();
    history.push("/main/admin/board/qna");
  }

 

  return(
    <div className={styles.container}>
      {
        mode ? 
        <Accordion className={styles.accordion} defaultActiveKey="0">     
          {/* 1. 홈 버튼 */}
          <Card className={styles.card}>          
            <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="0">
              <div className={styles.boardText} onClick={goHome}>홈</div>
            </Accordion.Toggle>
          </Card>

          {/* 2. 프로젝트 */}
          <Card>
            <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="1">
              <div className={styles.boardText} onClick={goProject}>프로젝트</div>
            </Accordion.Toggle>
            {/* <Accordion.Collapse eventKey="1">
              <Card.Body className={styles.navBody}>
                <ul>
                  {
                    mockData.project.map(proj=>{
                      return(
                      <li><Link className={styles.link} to="/main/project/overview">{proj.p_title}</Link></li>
                      );
                    })
                  }                
                </ul>
              </Card.Body>
            </Accordion.Collapse> */}
          </Card>

          {/* 3. 게시판 */}
          <Card>
            <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="2"><span className={styles.boardText}>게시판</span></Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body className={styles.navBody}>
                <ul className={styles.ul}>
                  <li className={styles.list} onClick={goNotice} >공지사항</li>
                  <li className={styles.list} onClick={goQna} >QnA</li>
                  <li className={styles.list} onClick={goCompanyTree} >조직도</li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        :        
        <Accordion className={styles.accordion} defaultActiveKey="0">         

          {/* 1. 관리자 프로젝트 관리 */}
          <Card>
            <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="1">
              <div onClick = {goAdminProject} className={styles.boardText}>프로젝트 관리</div>
            </Accordion.Toggle>
            {/* <Accordion.Collapse eventKey="1">
              <Card.Body className={styles.navBody}>
                <ul>
                  {
                    // mockData.project.map(proj=>{
                    //   return(
                    //   <li><Link className={styles.link}to="/main/project/overview">{proj.p_title}</Link></li>
                    //   );
                    // })
                  }                
                </ul>
              </Card.Body>
            </Accordion.Collapse> */}
          </Card>

           {/* 2. 관리자 게시판 관리 */}
           <Card>
            <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="2"><span className={styles.boardText}>게시판 관리</span></Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body className={styles.navBody}>
                <ul className={styles.ul}>
                  <li onClick={goAdminNotice} className={styles.list}>공지사항 관리</li>
                  <li onClick={goAdminQna} className={styles.list}>QnA 관리</li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      }
    </div> 
  );
};

export default NavList;
