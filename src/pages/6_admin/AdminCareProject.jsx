import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./AdminCareProject.module.css";

import WorkBigCategory from "./WorkBigCategory";
import WorkMiddleCategory from "./WorkMiddleCategory";
import WorkSmallCategory from "./WorkSmallCategory";

import AdminTeamList from "./AdminTeamList";
import axios from "axios";

const AdminCareProject = props => {
    // 1. Top navbar / history : 경로 이동
    const history = useHistory();

    const goProjectHome = event => {
        event.preventDefault();
        history.push(`/main/admin/editProject/${props.match.params.id}`);
    };

    const goProjectDetails = event => {
        event.preventDefault();
        history.push(`/main/admin/editProjectDetails/${props.match.params.id}`);
    };

    // 2. state 관리
    const [wlb, setWlb] = useState([]);
    const [wlm, setWlm] = useState([]);
    const [wld, setWld] = useState([]);

    const [bigCategoryId, setBigCategoryId] = useState(0);
    const [midCategoryId, setMidCategoryId] = useState(-1);
    const [smallCategoryId, setSmallCategoryId] = useState(100000000);

    const [peopleList, setPeopleList] = useState([]);

    // 2-2 category name 관리
    const [bigCategoryName, setBigCategoryName] = useState("");
    const [midCategoryName, setMidCategoryName] = useState("");
    const [selectedMan, setSelectedMan] = useState(0);

    const [team, setTeam] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);

    const [updateDetails, setUpdateDetails] = useState({
        wl_id: "",
        wl_work_detail: "",
        wl_date_start: "",
        wl_date_end: "",
        e_id: 0,
    });

    const [userInfo, setUserInfo] = useState({
        e_id: 0,
        e_photo: "",
        ep_position: "",
        e_name: "",
        e_rank: "",
    });

    useEffect(() => {
        setUserInfo({
            e_id: 0,
            e_photo: "",
            ep_position: "",
            e_name: "",
            e_rank: "",
        });
        setUpdateDetails({
            wl_id: "",
            wl_work_detail: "",
            wl_date_start: "",
            wl_date_end: "",
            e_id: 0,
        });
        setSmallCategoryId(100000000);
        setMidCategoryName("");
        setIsUpdate(false);
    }, [midCategoryId]);

    useEffect(() => {
        setUserInfo({
            e_id: 0,
            e_photo: "",
            ep_position: "",
            e_name: "",
            e_rank: "",
        });
        setUpdateDetails({
            wl_id: "",
            wl_work_detail: "",
            wl_date_start: "",
            wl_date_end: "",
            e_id: 0,
        });
        setIsUpdate(false);
    }, [smallCategoryId]);

    useEffect(() => {
        getWL();
    }, []);

    const getWL = async () => {
        const result = await axios(
            "/project/work/detail/list/" + props.match.params.id
        );
        setWlb(result.data.result.wlb);
        setWlm(result.data.result.wlm);

        const result2 = await axios(
            "/project/list/emp/" + props.match.params.id
        );
        setPeopleList(result2.data.result);

        axios.get(`/project/list/emp/${props.match.params.id}`).then(res => {
            setTeam(res.data.result);
        });
    };

    // 3. mothods
    const renewalDetails = () => {
        setSmallCategoryId("강세훈");
    };

    return (
        <div>
            <ul className={styles.navContainer}>
                <li className={styles.button} onClick={goProjectHome}>
                    프로젝트 관리
                </li>
                <li className={styles.button} onClick={goProjectDetails}>
                    업무 관리
                </li>
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
                                setBigCategoryName={setBigCategoryName}
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
                            <AdminTeamList
                                setSelectedMan={setSelectedMan}
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                                team={team}
                                updateDetails={updateDetails}
                                setUpdateDetails={setUpdateDetails}
                            />
                        </div>
                        <div className={styles.right}>
                            <WorkSmallCategory
                                bigCategoryName={bigCategoryName}
                                midCategoryName={midCategoryName}
                                midCategoryId={midCategoryId}
                                smallCategoryId={smallCategoryId}
                                selectedMan={selectedMan}
                                setSelectedMan={setSelectedMan}
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                                team={team}
                                updateDetails={updateDetails}
                                setUpdateDetails={setUpdateDetails}
                                wld={wld}
                                setWld={setWld}
                                isUpdate={isUpdate}
                                setIsUpdate={setIsUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCareProject;
