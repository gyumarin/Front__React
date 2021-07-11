import React, {useState} from 'react';
import { useHistory } from 'react-router';
import styles from './AdminCareProject.module.css';

import WorkBigCategory from "./WorkBigCategory";
import WorkMiddleCategory from "./WorkMiddleCategory";
import WorkSmallCategory from "./WorkSmallCategory";

import AdminTeamList from './AdminTeamList';

const AdminCareProject = (props) => {

    // 1. Top navbar / history : 경로 이동
    const history = useHistory();

    const goProjectHome =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/editProject/${props.match.params.id}`);
    }

    const goProjectDetails =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/editProjectDetails/${props.match.params.id}`);
    }


    // 2. state 관리 
    const [wlb,setWlb] = useState([]);
    const [wlm,setWlm] = useState([]);
    const [wld,setWld] = useState([]);

    const [bigCategoryId, setBigCategoryId] = useState("0");
    const [midCategoryId, setMidCategoryId] = useState("0");
    const [smallCategoryId, setSmallCategoryId] = useState("0");

    const [peopleList, setPeopleList] = useState([]);
    // 2-2 category name 관리
    const[bigCategoryName, setBigCategoryName] = useState("");
    const[midCategoryName, setMidCategoryName] = useState("");

    // 3. mothods
    const renewalDetails = () => {
        setSmallCategoryId("강세훈");
    };

    return(
        <div>
            <ul className={styles.navContainer}> 
                <li className={styles.button} onClick={goProjectHome}>프로젝트 관리</li>
                <li className={styles.button} onClick={goProjectDetails}>업무 관리</li>          
            </ul>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>업무 관리</div>               
                </div>
                <div className={styles.workList}>
                    
                    <div className={styles.works}>
                        <div className={styles.left}>
                            <WorkBigCategory                                
                                wlb={wlb}
                                setWlb={setWlb}

                                bigCategoryId={bigCategoryId}
                                midCategoryId={midCategoryId}
                                setBigCategoryId={setBigCategoryId}
                                setMidCategoryId={setMidCategoryId}
                                
                                setBigCategoryName ={setBigCategoryName}

                                renewalDetails={renewalDetails}
                            />

                            <WorkMiddleCategory                                
                                wlm={wlm}
                                setWlm={setWlm}

                                midCategoryId={midCategoryId}
                                smallCategoryId={smallCategoryId}
                                setBigCategoryId={setBigCategoryId}
                                setSmallCategoryId={setSmallCategoryId}

                                // bigCategoryName={bigCategoryName}
                                setMidCategoryName={setMidCategoryName}
                            />
                            <AdminTeamList/>
                        </div>
                        <div className={styles.right}>
                            <WorkSmallCategory                                
                                wld={wld}
                                setWld ={setWld}
                                
                                bigCategoryName={bigCategoryName}
                                midCategoryName={midCategoryName}
                                smallCategoryId={smallCategoryId}
                                
                                peopleList={peopleList}
                            />
                        </div>
                    </div>
                </div>                   
            </div>
        </div>
    )
};

export default AdminCareProject;