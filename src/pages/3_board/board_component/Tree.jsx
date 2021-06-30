import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import styles from './Tree.module.css';


const data = {
    id: 'root',
    name: '더존 비즈온',
    children: [
      {
        id: '1',
        name: '영업부',
      },
      {
        id: '2',
        name: '아비부',
        children: [
            {
              id: '5',
              name: 'A팀',
            },
            {
                id: '6',
                name: 'B팀',
            },
        ]
      },
      {
        id: '3',
        name: '기술부',
        children: [
          {
            id: '7',
            name: 'B팀',
          },
        ],
      },
      {
        id: '4',
        name: '꼬마도미부',
        children: [
          {
            id: '8',
            name: 'B팀',
          },
        ],
      },
    ],
  };

const useStyles = makeStyles({
    root: {
        background: 'aliceblue',
        // background: 'linear-gradient(75deg,#3eadcf  30%, #abe9cd 80%)',       
        borderRadius: 10,
        boxShadow: ' 6px 7px 22px 0px rgba(0, 0, 0, 0.44)',
        color: '#263238',
        width: '300px',
        height: '697.5px',
        fontSize:'20px',
        padding: '1em',
        paddingTop : '2em',
        
    },    
  });

const Tree = ({changeTeamView}) => {
    const classes = useStyles();

    const handleClick = (event)=>{
      event.preventDefault();
      changeTeamView(event.target.innerText);
    } 

    const renderTree = (nodes) => (
      <div className={styles.tree}>
        <TreeItem 
          key={nodes.id} 
          nodeId={nodes.id} 
          label={nodes.name}
          onClick ={handleClick}>            
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      </div>
    );
    
    return(
      <div>
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {renderTree(data)}
        </TreeView>       
      </div>
    );
};

export default Tree;