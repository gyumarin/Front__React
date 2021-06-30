import React from 'react';
import styles from './CompanyTree.module.css';
import Tree from './Tree';
import { useState } from 'react';
import TeamCardForTree from './TeamCardForTree';

const CompanyTree = (props) => {

    
    const [team, setTeam] =  useState('더존비즈온');

    const changeTeamView = (team) =>{
        setTeam(team);
    };    

    return(
        <div className={styles.container}>
            <div className={styles.title}>조직도</div>

            <div className={styles.content}>
                <div className={styles.tree}>
                    <Tree
                        team = {team}
                        changeTeamView = {changeTeamView}
                    /> 
                </div>
                <div className  ={styles.belongs}>
                   <div className ={styles.teamTitle}>{team}</div>
                   <div className={styles.contents}>
                   {
                       [{nickname:"james", name : "강세훈", tel : "324-5689", team : "총무팀"},
                       {nickname:"james", name : "강세훈", tel : "324-5689", team : "회계 1팀"},
                       {nickname:"james", name : "강세훈", tel : "324-5689", team : "경리팀"},
                       {nickname:"james", name : "강세훈", tel : "324-5689", team : "컨텐츠 개발팀"},
                       {nickname:"james", name : "강세훈", tel : "324-5689", team : "개발 1팀"},
                       {nickname:"james", name : "강세훈", tel : "324-5689", team : "개발 2팀"}].map((team)=>{
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