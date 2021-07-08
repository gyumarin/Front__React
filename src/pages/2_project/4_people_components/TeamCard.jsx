import React from 'react';
import styles from './TeamCard.module.css';
import { Link } from 'react-router-dom';

const TeamCard = ({worker}) => {
    return(
        <div className={worker.p_manager == worker.e_id ? (!worker.e_commute? styles.noBossContainer : styles.Bosscontainer) : (!worker.e_commute? styles.noContainer : styles.container) }>
            
            <div className={worker.p_manager == worker.e_id ?  styles.bossLeft : styles.left}>
                <div className={styles.imageContainer}>
                    <img className ={styles.photo} src={worker.e_photo} alt="face" />
                </div>
                <p className={styles.nickName}>{worker.e_nickname}
                    <span className={styles.rank}>({worker.e_rank})</span>
                    <Link to={'/main/mail/write/'+worker.e_id}><button className={worker.p_manager == worker.e_id ? styles.buttomBossMail : styles.buttomMail}><i className="far fa-envelope"></i></button></Link>
                </p>
            </div>

            <div className={ worker.p_manager == worker.e_id ? styles.bossRight : styles.right}>                
                <div className={worker.p_manager == worker.e_id ? styles.bossOneTalk: styles.oneTalk}>
                    {worker.e_comment}
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