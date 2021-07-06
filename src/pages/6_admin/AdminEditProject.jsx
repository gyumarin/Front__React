import React from "react";
import { useState, useRef } from "react";
import styles from "./AdminEditProject.module.css";

import CalendarPopUp from "./CalendarPopUp";
import AddTeamPopUp from "./AddTeamPopUp";

import projectData from "../../Data/projectData";
import WorkBigCategory from "./WorkBigCategory";
import WorkMiddleCategory from "./WorkMiddleCategory";
import WorkSmallCategory from "./WorkSmallCategory";
import { useEffect } from "react";
import axios from "axios";

const AdminEditProject = props => {
    const [workList, setWorkList] = useState({});
    const [peopleList, setPeopleList] = useState([]);
    const [projectDetail, setProjectDetail] = useState({});

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
        setProjectDetail(result3.data.result);
    };

   

    // 1. state 관리

    // 1-1. category Id 관리
    const [bigCategoryId, setBigCategoryId] = useState("0");
    const [midCategoryId, setMidCategoryId] = useState("0");
    const [smallCategoryId, setSmallCategoryId] = useState("0");


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
    const editDate = (start, end) => {
        const copy = { ...projectDetail, p_date_start: start, p_date_end: end };
        setProjectDetail(projectDetail => copy);
    };

    // 3-3. edit Team
    const deleteTeam = event => {
        event.preventDefault();
        // const id =
        // event.target.parentNode.parentNode.id == ""
        //     ? event.target.parentNode.parentNode.parentNode.id
        //     : event.target.parentNode.parentNode.id;
        // const copy = [...project.people].filter(person => {
        //     return person.e_id != id;
        // });
        // setProject({ ...project, people: copy });

        deletePeople(
            event.target.parentNode.parentNode.id == ""
                ? event.target.parentNode.parentNode.parentNode.id
                : event.target.parentNode.parentNode.id
        );
    };

    const deletePeople = ep_id => {
        const result = axios.delete("/project/employee/delete/" + ep_id);
        getWL();
    };

    const renewalDetails = () => {
        setSmallCategoryId("강세훈");
    };

    // 3-4. save all Data
    const saveData = event => {
        event.preventDefault();
    };

    // ------------------------------------------------------
    
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>프로젝트 관리</div>
                <button className={styles.saveButton} onClick={saveData}>
                    저장
                </button>
            </div>

            {/* Body */}
            <div className={styles.body}>
                {/* Body - left */}
                <div className={styles.left}>
                    {/* left_1 - 일정 관리 */}
                    <p className={styles.projectName}>
                        {projectDetail.p_title}
                    </p>
                    <div className={styles.projectDate}>
                        프로젝트 기간 : {projectDetail.p_date_start} ~{" "}
                        {projectDetail.p_date_end}
                        <button
                            className={styles.button1}
                            onClick={onCalendarPopup}
                        >
                            변경
                        </button>
                        {calendarPopup ? (
                            <CalendarPopUp
                                setCpopup={setCalendarPopup}
                                editDate={editDate}
                                p_id={projectDetail.p_id}
                            />
                        ) : null}
                    </div>

                    {/* left_2 - 인원 관리 */}
                    <div className={styles.teamList}>
                        <div>프로젝트 인원</div>
                        <div className={styles.peopleList}>
                            {peopleList.map(person => {
                                return (
                                    <div
                                        className={styles.card}
                                        id={person.ep_id}
                                    >
                                        <div className={styles.cardContainer}>
                                            <img
                                                className={styles.image}
                                                src="../../images/example.jpg"
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
                            <button
                                className={styles.addTeam}
                                onClick={onTeamPopup}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                            {teamPopup ? (
                                <AddTeamPopUp
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
                    {/* Right_3 - 업무리스트 */}
                    <div className={styles.workList}>
                        <div>업무 리스트</div>
                        <div className={styles.works}>
                            <WorkBigCategory                                
                                wlb={wlb}
                                setWlb={setWlb}

                                bigCategoryId={bigCategoryId}
                                midCategoryId={midCategoryId}
                                setBigCategoryId={setBigCategoryId}
                                setMidCategoryId={setMidCategoryId}
                                
                                renewalDetails={renewalDetails}
                            />

                            <WorkMiddleCategory                                
                                wlm={wlm}
                                setWlm={setWlm}

                                midCategoryId={midCategoryId}
                                smallCategoryId={smallCategoryId}
                                setBigCategoryId={setBigCategoryId}
                                setSmallCategoryId={setSmallCategoryId}
                            />

                            <WorkSmallCategory                                
                                wld={wld}
                                setWld ={setWld}

                                smallCategoryId={smallCategoryId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditProject;
