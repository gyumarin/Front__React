import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import styles from './Tree.module.css';
import axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        background: 'aliceblue',
        // background: 'linear-gradient(75deg,#3eadcf  30%, #abe9cd 80%)',       
        borderRadius: 10,
        boxShadow: ' 6px 7px 22px 0px rgba(0, 0, 0, 0.44)',
        color: '#263238',
        width: '265px',
        height: '697.5px',
        fontSize:'20px',
        padding: '1em',
        paddingTop : '2em',
        
    },    
  });

const Tree = ({changeTeamView, setTeamId}) => {
  const idArr =[];
  const [deptId, setDeptId] = useState();
  const [dept,setDept] = useState([]);

  function setIdArr(){
    dept.forEach(e => {   
      e.children.forEach(k=>{
        idArr.push(k);
      })   
      idArr.push(e);
    });
    // console.log(idArr);
  }
  setIdArr();


  const getDept = async()=>{
    const result = await axios.get("/employee/dept");
    setDept(result.data.result);
  }

  const classes = useStyles();
  useEffect(()=>{getDept();},[])
  const data = {
    id: 'root',
    name: '더존 비즈온',
    children: dept,
  };

  const handleClick = (event)=>{
    if(event.target.innerText == "더존 비즈온"){
      setTeamId("douzone");
      changeTeamView("사내 전체 조직도");
    }
    else{
      event.preventDefault();
      const team_id = idArr.find(i => i.name == event.target.innerText).id;
      setTeamId(team_id);
      changeTeamView(event.target.innerText);
    }
   
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