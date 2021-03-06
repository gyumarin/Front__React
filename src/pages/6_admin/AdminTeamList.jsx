import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AdminTeamList.module.css";

const AdminTeamList = ({
    setSelectedMan,
    userInfo,
    setUserInfo,
    team,
    updateDetails,
    setUpdateDetails,
}) => {
    const selectMan = event => {
        event.preventDefault();
        setSelectedMan(event.target.id);
        const copy = team.filter(value => value.e_id == event.target.id);
        setUpdateDetails({
            ...updateDetails,
            e_id: copy[0].e_id,
        });
        setUserInfo({
            ...userInfo,
            e_id: copy[0].e_id,
            e_photo: copy[0].e_photo,
            ep_position: copy[0].ep_position,
            e_name: copy[0].e_name,
            e_rank: copy[0].e_rank,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>팀원 리스트</div>
            <div className={styles.content}>
                <div
                    style={{
                        width: "100%",
                        height: "255px",
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {team.map(man => {
                        return (
                            <div
                                className={styles.card}
                                id={man.e_id}
                                onClick={selectMan}
                            >
                                <img
                                    className={styles.image}
                                    id={man.e_id}
                                    src={man.e_photo}
                                    alt="face image"
                                />
                                <div
                                    className={styles.cardContents}
                                    id={man.e_id}
                                >
                                    <div className={styles.text1} id={man.e_id}>
                                        {man.ep_position}
                                    </div>
                                    <div className={styles.text2} id={man.e_id}>
                                        {man.e_name}({man.e_rank})
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default AdminTeamList;
