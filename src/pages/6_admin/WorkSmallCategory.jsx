import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AdminWorkListCard from "./AdminWorkListCard";
import styles from "./WorkSmallCategory.module.css";

const WorkSmallCategory = ({
    smallCategoryId,
    bigCategoryName,
    midCategoryName,
    selectedMan,
    setSelectedMan,
    userInfo,
    setUserInfo,
    team,
    updateDetails,
    setUpdateDetails,
    wld,
    setWld,
}) => {
    // state
    const newDetail = useRef("");
    const startTime = useRef("");
    const EndTime = useRef("");

    const [teamList, setTeamList] = useState([]);
    const [charge, setCharge] = useState({});

    const [isUpdate, setIsUpdate] = useState(false);

    const param = useParams();
    const projectId = parseInt(param.id);

    const getWL = async () => {
        const result = await axios.get(
            "/project/work/detail/list/" + projectId
        );
        await setWld(result.data.result.wld);
    };

    // method
    const smallCategoryData = wld.filter(item => {
        return item.m_id == smallCategoryId;
    });

    useEffect(() => {
        getWL();
        axios.get(`/project/list/emp/${projectId}`).then(res => {
            setTeamList(res.data.result);
        });
    }, []);

    

    const onCreateNewDetails = async event => {
        event.preventDefault();
        if (
            bigCategoryName == "" ||
            midCategoryName == "" ||
            updateDetails.wl_work_detail == "" ||
            updateDetails.wl_date_start == "" ||
            updateDetails.wl_date_end == "" ||
            updateDetails.e_id == 0
        ) {
            alert("세부 업무 등록에서 누락된 정보가 있는 지 확인부탁드립니다.");
        } else {

        alert("업무가 등록되었습니다.");
        const result = await axios.post("/project/work/insert", {
            p_id: projectId,
            wl_work_category: bigCategoryName,
            wl_work: midCategoryName,
            wl_work_detail: updateDetails.wl_work_detail,
            wl_date_start:updateDetails.wl_date_start,
            wl_date_end:updateDetails.wl_date_end,
            e_id: updateDetails.e_id,
        });
        const copy = {
            d_charge: userInfo.e_name,
            d_end: updateDetails.wl_date_end,
            d_start: updateDetails.wl_date_start,
            d_name: updateDetails.wl_work_detail,
            e_id: updateDetails.e_id,
            m_id: smallCategoryId,
            wl_done: "1",
            wl_id: result.data.result,
        };

        setWld([copy, ...wld]);
        setSelectedMan(0);
        setUserInfo({
            wl_id: "",
            wl_work_detail: "",
            wl_date_start: "",
            wl_date_end: "",
            e_id: 0,
        });
        setUpdateDetails({
            wl_id: "",
            wl_work_detail: "",
            wl_date_start: "",
            wl_date_end: "",
            e_id: 0,
        });
    }
    };

    const onUpdateDetails = event => {
        event.preventDefault();
        if (
            bigCategoryName == "" ||
            midCategoryName == "" ||
            updateDetails.wl_work_detail == "" ||
            updateDetails.wl_date_start == "" ||
            updateDetails.wl_date_end == "" ||
            updateDetails.e_id == 0
        ) {
            alert("@@");
        } else {
        alert("프로젝트가 수정되었습니다.");
        axios.put("/project/work/update", {
            p_id: projectId,
            wl_work_category: bigCategoryName,
            wl_work: midCategoryName,
            wl_id: updateDetails.wl_id,
            wl_work_detail: updateDetails.wl_work_detail,
            wl_date_start: updateDetails.wl_date_start,
            wl_date_end: updateDetails.wl_date_end,
            e_id: updateDetails.e_id,
        });
        const a = wld.indexOf(
            wld.find(value => value.wl_id == updateDetails.wl_id)
        );
        let copy = [...wld];
        copy[a].d_charge = userInfo.e_name;
        copy[a].d_end = updateDetails.wl_date_end;
        copy[a].d_start = updateDetails.wl_date_start;
        copy[a].d_name = updateDetails.wl_work_detail;
        copy[a].e_id = updateDetails.e_id;
        setWld(copy);
        setSelectedMan(0);
        setUpdateDetails({
            wl_id: "",
            wl_work_detail: "",
            wl_date_start: "",
            wl_date_end: "",
            e_id: 0,
        });
        setUserInfo({
            wl_id: "",
            wl_work_detail: "",
            wl_date_start: "",
            wl_date_end: "",
            e_id: 0,
        });
        setIsUpdate(false);
    }
    };

    const onChange = e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setUpdateDetails({
            ...updateDetails, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
        });
    };

    // ---------------------------------------------------------------------
    return (
        <div className={styles.container}>
            <div className={styles.title}>세부업무 등록</div>

            <div className={styles.content}>
                <form
                    action="get"
                    onSubmit={onCreateNewDetails}
                    className={
                        isUpdate
                            ? styles.updateFormContainer
                            : styles.formContainer
                    }
                >
                    <div className={styles.upper}>
                        <div className={styles.formCategory}>
                            <div style={{ height: "50%", display: "flex" }}>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        width: "30%",
                                        textAlign: "left",
                                    }}
                                >
                                    카테고리 :{" "}
                                </div>{" "}
                                {bigCategoryName == ""?
                                <div
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        border: "1px solid gray",
                                        borderRadius: "5px",
                                        paddingLeft: "0.5em",
                                    }}
                                >
                                    {bigCategoryName == ""
                                        ? "카테고리를 선택해주세요"
                                        : bigCategoryName}
                                </div>:
                                <div
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        // border: "1px solid gray",
                                        borderRadius: "5px",
                                        paddingLeft: "0.5em",
                                        fontWeight:'bold',
                                    }}
                                >
                                    {bigCategoryName == ""
                                        ? "카테고리를 선택해주세요"
                                        : bigCategoryName}
                                </div>
                                }
                            </div>
                            <div
                                style={{
                                    height: "50%",
                                    display: "flex",
                                    marginTop: "0.5em",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        width: "30%",
                                        textAlign: "left",
                                    }}
                                >
                                    업무 :{" "}
                                </div>{" "}
                                {midCategoryName !==""?
                                    <div
                                        style={{
                                            width: "100%",
                                            textAlign: "left",
                                            // border: "1px solid gray",
                                            borderRadius: "5px",
                                            paddingLeft: "0.5em",
                                            fontWeight:'bold',
                                        }}
                                    >
                                        {midCategoryName == ""
                                            ? "업무를 선택해주세요"
                                            : midCategoryName}
                                    </div> : 
                                    <div
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        border: "1px solid gray",
                                        borderRadius: "5px",
                                        paddingLeft: "0.5em",
                                    }}
                                >
                                    {midCategoryName == ""
                                        ? "업무를 선택해주세요"
                                        : midCategoryName}
                                </div>
                                    }
                            </div>
                        </div>

                        <div className={styles.formCharge}>
                            <label className={styles.lableCharge}>
                                담당자 :{" "}
                            </label>

                            <div className={styles.selectedCharge}>
                                {userInfo.e_id == 0 ? (
                                    <p
                                        style={{
                                            marginTop: "0.8em",
                                            marginLeft: "0.3em",
                                        }}
                                    >
                                        담당자 선택해주세요
                                    </p>
                                ) : (
                                    <>
                                        <img
                                            className={styles.image}
                                            src={userInfo.e_photo}
                                            // alt="face image"
                                        />
                                        <div className={styles.card}>
                                            <div className={styles.text1}>
                                                {userInfo.ep_position}
                                            </div>
                                            <div className={styles.text2}>
                                                {userInfo.e_name}-
                                                {userInfo.e_rank}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className={styles.formDate}>
                            <div className={styles.dateContainer}>
                                <label
                                    className={styles.dlabel}
                                    htmlFor="start"
                                >
                                    시작일 :
                                </label>
                                <input
                                    ref={startTime}
                                    className={styles.inputDate}
                                    id="start"
                                    type="date"
                                    placeholder="세부 업무"
                                    name="wl_date_start"
                                    value={updateDetails.wl_date_start}
                                    onChange={onChange}
                                />
                            </div>
                            <div className={styles.dateContainer1}>
                                <label className={styles.dlabel} htmlFor="end">
                                    마감일 :
                                </label>
                                <input
                                    ref={EndTime}
                                    className={styles.inputDate}
                                    type="date"
                                    placeholder="세부 업무"
                                    name="wl_date_end"
                                    value={updateDetails.wl_date_end}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formDetails}>
                        <div className={styles.labelDetail} htmlFor="title">
                            세부 업무
                        </div>
                        <input
                            ref={newDetail}
                            id="title"
                            className={styles.inputTitle}
                            type="text"
                            id="1"
                            name="wl_work_detail"
                            value={updateDetails.wl_work_detail}
                            onChange={onChange}
                        />
                    </div>
                    {isUpdate ? (
                        <input
                            type="button"
                            onClick={onUpdateDetails}
                            value="업무 수정"
                            className={styles.button}
                        />
                    ) : (
                        <input
                            type="button"
                            onClick={onCreateNewDetails}
                            value="업무 등록"
                            className={styles.button}
                        />
                    )}
                </form>

                <div className={styles.workListTitle} htmlFor="title">
                    업무 리스트 관리
                </div>
                <div className={styles.workList}>
                    {smallCategoryData.map(details => {
                        return (
                            <AdminWorkListCard
                                midCategoryName={midCategoryName}
                                setUpdateDetails={setUpdateDetails}
                                details={details}
                                setIsUpdate={setIsUpdate}
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                                team={team}
                                wld={wld}
                                setWld={setWld}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkSmallCategory;