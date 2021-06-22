import React from 'react';
import MiniProfile from './MiniProfile';
import NavList from './NavList';

import styles from './LeftNavBar.module.css';

const LeftNavBar = (props) => {
    return(
      <div className={styles.container}>
        <MiniProfile/>
        <NavList/>
      </div>
    );
};

export default LeftNavBar;