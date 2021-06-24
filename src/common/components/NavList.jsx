import React from 'react';
import styles from './NavList.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Accordion, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NavList = (props) => {

  return(
    <div className={styles.container}>
      <Accordion className={styles.accordion} defaultActiveKey="0">
        <Card className={styles.card}>
          <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="0"><span className={styles.boardText}>홈</span></Accordion.Toggle>          
        </Card>

        <Card>
          <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="1"><span className={styles.boardText}>프로젝트</span></Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={styles.navBody}>
              <ul>
                <li className={styles.list}><Link className={styles.link}to="/">projectA</Link></li>
                <li className={styles.list}><Link className={styles.link}to="/">projectB</Link></li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle className={styles.navToggle} as={Card.Header} eventKey="2"><span className={styles.boardText}>게시판</span></Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={styles.navBody}>
               <ul>
                <li className={styles.list}><Link className={styles.link}to="/">공지사항</Link></li>
                <li className={styles.list}><Link className={styles.link}to="/">QnA</Link></li>
                <li className={styles.list}><Link className={styles.link}to="/">조직도</Link></li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>
    </div> 
  );
};

export default NavList;
