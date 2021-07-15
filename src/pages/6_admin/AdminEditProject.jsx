import React from "react";
import { useState, useRef } from "react";
import styles from "./AdminEditProject.module.css";
import { NavLink, useHistory } from 'react-router-dom';
import CalendarPopUp from "./CalendarPopUp";
import AddTeamPopUp from "./AddTeamPopUp";

// import projectData from "../../Data/projectData";

import { useEffect } from "react";
import axios from "axios";
import WaitingConfirmCard from './WaitingConfirmCard';

const AdminEditProject = props => {
    const history = useHistory();

    const [workList, setWorkList] = useState({});
    const [peopleList, setPeopleList] = useState([]);
    const [projectDetail, setProjectDetail] = useState({});
    const [waitForConfirms, setWatiForConfirms] =useState([]);


    const [wlb,setWlb] = useState([]);
    const [wlm,setWlm] = useState([]);
    const [wld,setWld] = useState([]);

    useEffect(() => {
        getWL();
    }, []);    
    

    const getWL = async () => {
        const result = await axios(
            "/project/work/detail/list/" + props.match.params.id
        );
        // console.log(" test ",result.data.result.wlb);
        setWlb(result.data.result.wlb);
        setWlm(result.data.result.wlm);
        setWld(result.data.result.wld);        

        const result2 = await axios(
            "/project/list/emp/" + props.match.params.id
        );
        setPeopleList(result2.data.result);

        const result3 = await axios("/project/detail/" + props.match.params.id);
        // console.log(result3.data.result);
        setProjectDetail(result3.data.result);

        const result4 = await axios("/project/work/list/approval/request/"+ props.match.params.id);
        console.log(result4.data.result);
        setWatiForConfirms(result4.data.result);
    };

   

    // 1. state 관리

    // 1-1. category Id 관리
    const [bigCategoryId, setBigCategoryId] = useState("0");
    const [midCategoryId, setMidCategoryId] = useState("0");
    const [smallCategoryId, setSmallCategoryId] = useState("0");

    // 1-2. category name 관리
    const[bigCategoryName, setBigCategoryName] = useState("");
    const[midCategoryName, setMidCategoryName] = useState("");

    // 2. popup 관리
    const [calendarPopup, setCalendarPopup] = useState(false);
    const [teamPopup, setTeamPopup] = useState(false);

    // 3. method

    // 3-1. popup method
    const onCalendarPopup = event => {
        event.preventDefault();
        setCalendarPopup(true);
    };

    const onTeamPopup = event => {
        event.preventDefault();
        setTeamPopup(true);
    };

    // 3-2. edit Date
    const editDetail = (start, end, gitUrl) => {
        const copy = { ...projectDetail, p_date_start: start, p_date_end: end, p_giturl : gitUrl };
        setProjectDetail(projectDetail => copy);
    };

    // 3-3. edit Team
    const deleteTeam = event => {
        event.preventDefault();
        deletePeople(
            event.target.parentNode.parentNode.id == ""
                ? event.target.parentNode.parentNode.parentNode.id
                : event.target.parentNode.parentNode.id
        );
    };

    const onApply = (wlID) =>{
        var bool = window.confirm(wlID+'번 업무를 승인하시겠습니까?')
        if(bool){
            axios.put(`/project/done/${wlID}`);
            setWatiForConfirms(waitForConfirms.filter(item=>item.wl_id !== wlID))
            alert(wlID+'번 업무가 승인 되었습니다.')
        }
        
    }

    const onIgnore = (wlID, message) => {
        var bool = window.confirm(wlID+'번 업무를 반려하시겠습니까?')
       if(bool){
            axios.put(`/project/undone`,{
                wl_id : wlID,
                message: message,
                
            });
            setWatiForConfirms(waitForConfirms.filter(item=>item.wl_id !== wlID))
            alert(wlID+'번 업무가 반려 되었습니다.')
            
       }
    }

    const deletePeople = ep_id => {
        axios.delete("/project/employee/delete/" + ep_id);
        getWL();
    };

    const renewalDetails = () => {
        setSmallCategoryId("강세훈");
    };

    const goProjectHome =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/editProject/${props.match.params.id}`);
    }

    const goProjectDetails =(event)=>{
        event.preventDefault();
        history.push(`/main/admin/editProjectDetails/${props.match.params.id}`);
    }
    // ------------------------------------------------------
    
    return (
        <div>
            <ul className={styles.navContainer}> 
                <li className={styles.button} onClick={goProjectHome}>프로젝트 관리</li>
                <li className={styles.button} onClick={goProjectDetails}>업무 관리</li>          
            </ul>
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>프로젝트 관리</div>               
            </div>

            {/* Body */}
            <div className={styles.body}>
                {/* Body - left */}
                <div className={styles.left}>
                    {/* left_1 - 일정 관리 */}
                    <p className={styles.projectName}>
                        {projectDetail.p_title}
                    </p>
                    <div className={styles.projectDatas}>
                        <div className={styles.projectDate}>                            
                            - 프로젝트 기간 : {projectDetail.p_date_start} ~ {projectDetail.p_date_end}<br/>
                            - Git Reposotiry : {projectDetail.p_giturl}                         
                            {calendarPopup ? (
                                <CalendarPopUp
                                    setCpopup={setCalendarPopup}
                                    editDetail={editDetail}
                                    p_id={projectDetail.p_id}
                                    projectDetail={projectDetail}
                                />
                            ) : null}
                        </div>
                        <button
                            className={styles.button1}
                            onClick={onCalendarPopup}
                        >
                            정보 변경
                        </button>
                    </div>

                    {/* left_2 - 인원 관리 */}
                    <div className={styles.teamList}>
                        <div className={styles.peopleListHeader}>
                            <div className={styles.peopleListTitle}>프로젝트 인원</div>
                            <button
                                className={styles.addTeam}
                                onClick={onTeamPopup}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className={styles.peopleList}>
                            {peopleList.map(person => {
                                // console.log(peopleList)
                                return (
                                    <div
                                        className={styles.card}
                                        id={person.ep_id}
                                    >
                                        <div className={styles.cardContainer}>
                                            <img
                                                className={styles.image}
                                                src={person.e_photo}
                                                alt="face image"
                                            />
                                        </div>
                                        <div className={styles.contents}>
                                            <p>
                                                {person.e_name} |{" "}
                                                {person.e_rank} |{" "}
                                                {person.ep_position}
                                            </p>
                                        </div>
                                        <button
                                            className={styles.button2}
                                            onClick={deleteTeam}
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                    </div>
                                );
                            })}                           
                            {teamPopup ? (
                                <AddTeamPopUp
                                    peopleList={peopleList}
                                    setTeamPopup={setTeamPopup}
                                    match={props.match}
                                    getWL={getWL}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Body - Right */}
                <div className={styles.right}>
                    <div className={styles.rightContainer}>
                        <p style={{fontWeight:"bold"}}>업무 승인 처리</p>
                        <div className={styles.rightContents}>
                            <div className={styles.numberOfWating}>승인 대기 중인 업무 : <div className={styles.w_number}>{waitForConfirms.length}</div>개</div>
                            <div className={styles.confirms}>
                            {
                               waitForConfirms.map(confirm=>{
                                    return <WaitingConfirmCard 
                                        confirm = {confirm}
                                        onApply = {onApply}
                                        onIgnore = {onIgnore}
                                    />;
                                })
                            }
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    </div>
    );
};

export default AdminEditProject;