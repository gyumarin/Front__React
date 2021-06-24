import React from 'react';
import { useState } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import styles from './TopNavBar.module.css' 

const TopNavBar = (props) => {
  const [key, setKey] = useState('home');

  return(
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
    <Tab eventKey="home" title="Home">
      <h1>hello</h1>
    </Tab>
    <Tab eventKey="profile" title="Profile">
      <h2>sehoon kang</h2>
    </Tab>
    <Tab eventKey="contact" title="Contact">
      <h3>오코노미야키</h3>
    </Tab>
  </Tabs>
  );
};

export default TopNavBar;