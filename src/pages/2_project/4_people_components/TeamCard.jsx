import React from 'react';
import styles from './TeamCard.module.css';
import { Link } from 'react-router-dom';

const TeamCard = ({worker}) => {
    return(
        <div className={!worker.e_commute? styles.noContainer : styles.container}>
            <div className={styles.left}>
                <div className={styles.imageContainer}>
                    <img className ={styles.photo} src="../../images/example.jpg" alt="face" />
                </div>
                <p className={styles.nickName}>{worker.e_nickname}
                    <span className={styles.rank}>({worker.e_rank})</span>
                    <Link to="/main/mail"><button className={styles.buttomMail}><i className="far fa-envelope"></i></button></Link>
                </p>
            </div>
            <div className={styles.right}>                
                <div className={styles.oneTalk}>
                    만나서 반갑습니더
                </div>
                <hr />
                <table className={styles.table}>
                    <tr className={styles.tr}>
                        <td>팀명 : </td>
                        <td className={styles.td}>{worker.d_name}</td>
                    </tr>
                    <tr className={styles.tr}>
                        <td>성명 : </td>
                        <td className={styles.td}>{worker.e_name}</td>
                    </tr>
                    <tr className={styles.tr}>
                        <td>메일 : </td>
                        <td className={styles.td}>{worker.e_email}</td>
                    </tr>
                    <tr className={styles.tr}>
                        <td>연락처 : </td>
                        <td className={styles.td}>{worker.e_e_phone}</td>
                    </tr>                    
                </table>               
            </div>
        </div>
    );
};

export default TeamCard;