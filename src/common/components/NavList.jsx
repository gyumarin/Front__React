import React from 'react';
import styles from './NavList.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Accordion, Card} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import mockData from '../../Data/data';

const NavList = (props) => {
  
  const history = useHistory();
 
  return(
    <div className={styles.container}>
      <Accordion className={styles.accordion} defaultActiveKey="0">

        {/* 1. 홈 버튼 */}
        <Card className={styles.card}>          
          <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="0">
            <Link to='/main/home'>
              <span className={styles.boardText}>홈</span>
            </Link>
          </Accordion.Toggle>
        </Card>

        {/* 2. 프로젝트 */}
        <Card>
          <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="1">
            <Link to='/main/projectList'>
              <span className={styles.boardText}>프로젝트</span>
              </Link></Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={styles.navBody}>
              <ul>
                {
                  mockData.project.map(proj=>{
                    return(
                     <li><Link className={styles.link}to="/main/project/overview">{proj.p_title}</Link></li>
                    );
                  })
                }                
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* 3. 게시판 */}
        <Card>
          <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="2"><Link to="/main/board/notice"><span className={styles.boardText}>게시판</span></Link></Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={styles.navBody}>
               <ul>
                <li className={styles.list}><Link className={styles.link}to="/main/board/notice">공지사항</Link></li>
                <li className={styles.list}><Link className={styles.link}to="/main/board/qna">QnA</Link></li>
                <li className={styles.list}><Link className={styles.link}to="/main/board/companyTree">조직도</Link></li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>
    </div> 
  );
};

export default NavList;
