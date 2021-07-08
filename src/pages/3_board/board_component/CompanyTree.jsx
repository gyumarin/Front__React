import React from 'react';
import styles from './CompanyTree.module.css';
import Tree from './Tree';
import { useState } from 'react';
import TeamCardForTree from './TeamCardForTree';
import { useEffect } from 'react';
import axios from 'axios';
import tree from '../../../images/tree.png'

const CompanyTree = (props) => {
    const [nowTeam, setNowTeam] = useState([]);
    const [teamId, setTeamId] = useState('douzone');
    const [team, setTeam] =  useState("사내 전체 조직도");

    const changeTeamView = (team) =>{
        setTeam(team);
    };    

    useEffect(()=>{
        axios.get("/employee/list").then(res => {
            if(teamId == 1 | teamId ==2 | teamId ==3 | teamId ==4){
                setNowTeam(nowTeam => res.data.result.filter(i => {
                    return i.dept_d_id == teamId;
                }));
            }
            else{
               setNowTeam(nowTeam => res.data.result.filter(i => {
                    return i.d_id == teamId;
                }));
            }           
        })
    },[teamId]);


    return(
        <div className={styles.container}>
            <div className={styles.title}>조직도</div>

            <div className={styles.content}>
                <div className={styles.tree}>
                    <Tree
                        team = {team}
                        setTeamId={setTeamId}
                        changeTeamView = {changeTeamView}
                    /> 
                </div>
                <div className  ={styles.belongs}>
                   <div className ={styles.teamTitle}>{team}</div>
                   <div className={styles.contents}>                   
                    {  
                        teamId == "douzone" ?
                    <div>
                        <img className ={styles.wholeTree} src={tree} alt="company team tree" />
                    </div>
                    : nowTeam.map((team)=>{
                        return(
                        <TeamCardForTree
                            team = {team}
                        />
                        )
                    })
                   }
                   </div>
                </div>
            </div>
        </div>
    );
};
export default CompanyTree;