const projectData = {
    p_id: 1,
    p_title: '부산 정보 산업진흥원 홈페이지 개발',
    p_date_start: '2021-03-11',
    p_date_end: '2021-08-11',
    p_Totalpersent: 100,
    p_success: 28,
    people : [
      { 
        "e_id": 1,
        "e_name": "강세훈",
        "e_nickname": "moris",
        "e_rank": "신입사원",
        "ep_position": "수비형 미드필더",            
      },
      { 
        "e_id": 2,
        "e_name": "박규민",
        "e_nickname": "gyuramin",
        "e_rank": "명예교수",
        "ep_position": "PM",            
      },
      { 
        "e_id": 3,
        "e_name": "류현태",
        "e_nickname": "hyuntae",
        "e_rank": "대리",
        "ep_position": "백엔드",            
      },
      { 
        "e_id": 4,
        "e_name": "이주빈",
        "e_nickname": "beutifuly",
        "e_rank": "CEO",
        "ep_position": "환경미화",            
      },
    ],

    p_big_category:[
        {
            "c_id" : 1,
            "c_name" : "사용자 페이지"            
        },
        {
            "c_id" : 2,
            "c_name" : "관리자 페이지",            
        },
    ],

    p_middle_category : 
    [
        {   "c_id" : 1,
            "m_id" : 1,
            "m_name" : "홈페이지 제작",            
        },

        {
            "c_id" : 1,
            "m_id" : 2,
            "m_name" : "프로젝트 페이지 제작",          
        },

        {
            "c_id" : 1,
            "m_id" : 3,
            "m_name" : "캘린더 제작",            
        },
        {   
            "c_id" : 2,
            "m_id" : 4,
            "m_name" : "홈페이지 제작",            
        },        
    ],

    p_detail : 
    [
        {   "c_id" : 1,
            "m_id" : 1,
            "d_id" : 1,
            "d_name" : "홈페이지 제작",
            "d_start" : "2021-07-23",
            "d_end" : "2021-07-26",
            "d_charge"  :"박규민"
        },   
        {
            "c_id" : 1,
            "m_id" : 1,
            "d_id" : 2,
            "d_name" : "홈페이지 제작",
            "d_start" : "2021-07-23",
            "d_end" : "2021-07-26",
            "d_charge"  :"박규민"
        },                         
        {
            "c_id" : 1,
            "m_id" : 1,
            "d_id" : 3,
            "d_name" : "홈페이지 제작",
            "d_start" : "2021-07-23",
            "d_end" : "2021-07-26",
            "d_charge"  :"박규민"
        },
        {            
            "c_id" : 1,
            "m_id" : 2,
            "d_id" : 4,
            "d_name" : "홈페이지 제작",
            "d_start" : "2021-07-23",
            "d_end" : "2021-07-26",
            "d_charge"  :"박규민"
        },
        {          
            "c_id" : 1,  
            "m_id" : 2,
            "d_id" : 5,
            "d_name" : "홈페이지 제작",
            "d_start" : "2021-07-23",
            "d_end" : "2021-07-26",
            "d_charge"  :"박규민"
        },
        {           
            "c_id" : 1,
            "m_id" : 3,
            "d_id" : 6,
            "d_name" : "홈페이지 제작",
            "d_start" : "2021-07-23",
            "d_end" : "2021-07-26",
            "d_charge"  :"박규민"
        },
    ]

};    

export default projectData;