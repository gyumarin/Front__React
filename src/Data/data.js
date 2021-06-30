const mockData = {
    user : {
        e_id: 1,
        e_name: '김봉팔',
        ep_position: 'Back-End',
    },

    project : [
        {
            p_id: 1,
            p_title: '부산 정보 산업진흥원 홈페이지 개발',
            p_date_start: '2021-03-11',
            p_date_end: '2021-08-11',
            p_Totalpersent: 100,
            p_success: 28,
        },
        {
            p_id: 2,
            p_title: 'SSG 페이 플랫폼',
            p_date_start: '2021-05-11',
            p_date_end: '2021-06-11',
            p_Totalpersent: 110,
            p_success: 66,
        },       
       
        
    ],

    notice : [
        {
            bn_id: '11',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '2',
            bn_date: '2021-06-16 18:20:22',
            e_name: '김봉팔',
            d_name: '영업 1팀',
        },
        {
            bn_id: '10',
            bn_title: '2021/06/13 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '112',
            bn_date: '2021-06-16 18:20:22',
            e_name: '정봉팔',
            d_name: '개발2팀',
        },
        {
            bn_id: '9',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '352',
            bn_date: '2021-06-16 18:20:22',
            e_name: '윤봉팔',
            d_name: '개발 1팀',
        },
        {
            bn_id: '9',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '352',
            bn_date: '2021-06-16 18:20:22',
            e_name: '윤봉팔',
            d_name: '개발 1팀',
        },
        {
            bn_id: '9',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '352',
            bn_date: '2021-06-16 18:20:22',
            e_name: '윤봉팔',
            d_name: '개발 1팀',
        },
        {
            bn_id: '9',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '352',
            bn_date: '2021-06-16 18:20:22',
            e_name: '윤봉팔',
            d_name: '개발 1팀',
        },
        {
            bn_id: '9',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '352',
            bn_date: '2021-06-16 18:20:22',
            e_name: '윤봉팔',
            d_name: '개발 1팀',
        },
        {
            bn_id: '9',
            bn_title: '2021/06/14 공지사항입니다.',
            bn_content:
                '국제교류원은 2021학년도 하계 계절학기에 영어전용강의(영어 100% 강의)를 개설하여 해외 대학생들과 함께 한국문화예술에 관한 강의를 수강하고 영어로 교류할 수 있는 환경을 제공하여 우리대학 재학생의 글로컬 역량과 글로벌 마인드를 강화시키고자 하오니 국제교류와 한국문화예술 전파에 관심있는 학생들의 많은 참여 바랍니다.',
            bn_hits: '352',
            bn_date: '2021-06-16 18:20:22',
            e_name: '윤봉팔',
            d_name: '개발 1팀',
        },
        
    ],

    commute : [
        {
            c_id: 10,
            c_date: '2021-06-17',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 10,
            c_date: '2021-06-17',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 9,
            c_date: '2021-06-16',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 8,
            c_date: '2021-06-15',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 7,
            c_date: '2021-06-14',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 6,
            c_date: '2021-06-16',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 5,
            c_date: '2021-06-15',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 4,
            c_date: '2021-06-14',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 2,
            c_date: '2021-06-12',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
        {
            c_id: 1,
            c_date: '2021-06-11',
            c_start: '08:50:33',
            c_end: '18:20:22',
        },
    ],

    work : [
        {
            wl_id: 1,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
        },
        {
            wl_id: 2,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '로그인',
            wl_date_start: '2020-07-16',
            wl_date_end: '2020-07-16',
            wl_done: 'true',
            e_id: '0001',
        },
        {
            wl_id: 3,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '캘린더',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
        },
        {
            wl_id: 4,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '오늘의 업무 리스트',
            wl_date_start: '2020-07-16',
            wl_date_end: '2020-07-16',
            wl_done: 'true',
            e_id: '0001',
        },
        {
            wl_id: 4,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '오늘의 업무 리스트',
            wl_date_start: '2020-07-16',
            wl_date_end: '2020-07-16',
            wl_done: 'true',
            e_id: '0001',
        },
        {
            wl_id: 4,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '오늘의 업무 리스트',
            wl_date_start: '2020-07-16',
            wl_date_end: '2020-07-16',
            wl_done: 'true',
            e_id: '0001',
        },
        {
            wl_id: 4,
            p_id: 1,
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '오늘의 업무 리스트',
            wl_date_start: '2020-07-16',
            wl_date_end: '2020-07-16',
            wl_done: 'true',
            e_id: '0001',
        },
    ],
    commits : [
        {
            wl_id: 1,
            p_id: 1,
            c_man : '강세훈',
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
            c_comment : '피카츄 라이츄 파이리 꼬부기'
        },
        {
            wl_id: 2,
            p_id: 2,
            c_man : '박규민',
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
            c_comment : '피카츄 라이츄 파이리 꼬부기'
        },
        {
            wl_id: 3,
            p_id: 3,
            c_man : '류현태',
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
            c_comment : '피카츄 라이츄 파이리 꼬부기'
        },
        {
            wl_id: 3,
            p_id: 3,
            c_man : '류현태',
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
            c_comment : '피카츄 라이츄 파이리 꼬부기'
        },
        {
            wl_id: 3,
            p_id: 3,
            c_man : '류현태',
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
            c_comment : '피카츄 라이츄 파이리 꼬부기'
        },
        {
            wl_id: 3,
            p_id: 3,
            c_man : '류현태',
            wl_work_category: '사용자 페이지',
            wl_work: '메인',
            wl_work_detail: '진행중인 프로젝트',
            wl_date_start: '2020-06-16',
            wl_date_end: '2020-06-16',
            wl_done: 'true',
            e_id: '0001',
            c_comment : '피카츄 라이츄 파이리 꼬부기'
        },
       
        
    ]
}

export default mockData;