import axios from 'axios';
import { useState, useEffect } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const headers = [
    { label: "업무 번호", key: "wl_id" },
    { label: "카테고리", key: "wl_work_category" },
    { label: "업무", key: "wl_work" },
    { label: "세부 업무", key: "wl_work_detail" },
    { label: "작업 소유자", key: "e_name" },
    { label: "시작일", key: "wl_date_start" },
    { label: "마감일", key: "wl_date_end" },
    { label: "업무 수행 여부(1:미처리, 2:확인중, 3:처리완료)", key: "wl_done" }
    
  ];

const ExcelDownload = ({ projectID }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`/project/work/list/team/${projectID}`).then(res => {
            console.log("ExcelDownload:",res.data.result)
            setData(res.data.result);
            data.concat()
            console.log("YYYY",new Date().getFullYear());
            console.log("MM",new Date().getMonth()+1);
            console.log("DD",new Date().getDate());

        });
    }, [])

    return (
      <div>
       {data.length!=0&&<button style={{marginTop:'10px',marginBottom:'-10px',backgroundColor: 'green',borderRadius:'10px',border:'0',padding:'5px'}}>
          <CSVLink 
          style={{textDecoration:'none',color:'white',fontSize:'16px',padding:'10px',fontWeight:'bolder',fontFamily: "Noto Sans, sans-serif"}}
          headers={headers} 
            data={data} 
            filename={"["+data[0].p_title+"]업무리스트("+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+").csv"}
            target="_blank"
          >
            엑셀로 내려받기
          </CSVLink>
        </button>}
      </div>
    );
  };

export default ExcelDownload;

