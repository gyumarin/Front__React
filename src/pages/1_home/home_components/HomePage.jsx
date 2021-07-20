import axios from 'axios';
import React, {useEffect, useState} from 'react';
import CommuteCalender from '../../../common/components/CommuteCalender';
import MiniNotice from '../../../common/components/MiniNotice';
import MiniWorkList from '../../../common/components/MiniWorkList';
import Project from '../../../common/components/Project';
import styles from './HomePage.module.css';



const HomePage = ({setProject}) => {

    const [projectList, setProjectList] = useState([]);

    useEffect( async () => {
        const tmp = sessionStorage.getItem('token').slice(0, -1).substr(1);
        await axios.get(`/project/list`,
            {headers: {
                'token': tmp
            }}
            ).then(res=>{
                setProjectList(res.data.result.filter(item=>item.p_complete==false))
                setProject(res.data.result)  
            });    
    }, []);
    
    return(
        <div className={styles.body}>
            <div className={styles.leftBody}>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>진행중인 프로젝트</span>    
                    <span className={styles.projectNumber}>{projectList.length}</span>  
                </div>
                {/*  */}
                {projectList.length==0?
                <div style={{textAlign:'center',marginLeft:'120px',paddingLeft:'10px',
                    width : '240px',fontSize:'15px', paddingTop:'260px',
                    paddingBottom:'20px',fontWeight:'bold', fontFamily:"Noto Sans"}} >
                    <span ><i style={{fontSize:'100px',color :'#0d6efd',}} className="fas fa-tasks" ></i> </span>
                    <p style={{marginTop:'30px'}}>진행중인 프로젝트가 없습니다.</p>
                </div>
                :
                <>
                    <div className={styles.projectContainer}>
                        {                
                            projectList.map((project)=>{
                            return <Project
                                id ={project.p_id}
                                key = {project.p_id}
                                title = {project.p_title}
                                start = {project.p_date_start}
                                end = {project.p_date_end}                        
                            />
                        })
                        }
                    </div>
                </>
                }
            </div>
            <div className={styles.rightBody}>
                <div className={styles.calender}>
                    <div>
                        <CommuteCalender/>
                    </div>
                </div>

                <div className={styles.dataList}>
                    <MiniNotice key = "1"/>
                    <MiniWorkList/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;