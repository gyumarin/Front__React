import React from 'react';
import styles from './PeopleListPage.module.css';
import TeamCard from './TeamCard';
const team = [
  {
      d_id: 5,
      d_name: "마케팅팀",
      d_phone: "874-9764",
      dept_d_id: "1",
      e_address: "부산시 부산구 부산동",
      e_e_phone: "323-5678",
      e_email: "hgd@gmail.com",
      e_id: 1001,
      e_name: "홍길동",
      e_nickname: "james",
      e_p_phone: "010-1234-5678",
      e_password: "1",
      e_photo: "1",
      e_rank: "대리",
      e_commute : true
  },{
    d_id: 5,
    d_name: "마케팅팀",
    d_phone: "874-9764",
    dept_d_id: "1",
    e_address: "부산시 부산구 부산동",
    e_e_phone: "323-5678",
    e_email: "hgd@gmail.com",
    e_id: 1001,
    e_name: "홍길동",
    e_nickname: "james",
    e_p_phone: "010-1234-5678",
    e_password: "1",
    e_photo: "1",
    e_rank: "팀장",
    e_commute : false
},{
  d_id: 5,
  d_name: "마케팅팀",
  d_phone: "874-9764",
  dept_d_id: "1",
  e_address: "부산시 부산구 부산동",
  e_e_phone: "323-5678",
  e_email: "hgd@gmail.com",
  e_id: 1001,
  e_name: "홍길동",
  e_nickname: "james",
  e_p_phone: "010-1234-5678",
  e_password: "1",
  e_photo: "1",
  e_rank: "대리",
  e_commute : true
},{
  d_id: 5,
  d_name: "마케팅팀",
  d_phone: "874-9764",
  dept_d_id: "1",
  e_address: "부산시 부산구 부산동",
  e_e_phone: "323-5678",
  e_email: "hgd@gmail.com",
  e_id: 1001,
  e_name: "홍길동",
  e_nickname: "james",
  e_p_phone: "010-1234-5678",
  e_password: "1",
  e_photo: "1",
  e_rank: "대리",
  e_commute : false
},{
  d_id: 5,
  d_name: "마케팅팀",
  d_phone: "874-9764",
  dept_d_id: "1",
  e_address: "부산시 부산구 부산동",
  e_e_phone: "323-5678",
  e_email: "hgd@gmail.com",
  e_id: 1001,
  e_name: "홍길동",
  e_nickname: "james",
  e_p_phone: "010-1234-5678",
  e_password: "1",
  e_photo: "1",
  e_rank: "대리",
  e_commute : true
}
]
const PeopleListPage = (props) => {
    return(
      <div className={styles.container}>
        <h3 className={styles.h3}>SSG 휘트니스 서비스</h3>
        <div className={styles.content}>
          {
            team.map((worker)=>{
              return <TeamCard
                worker = {worker}
              />
            })

          }         
        </div>            
      </div> 
    );
};

export default PeopleListPage;