import axios from 'axios';
import React, {useState , useEffect} from 'react';
import {Pie} from 'react-chartjs-2';

const Doughnut3= ({projectID}) => {

  const [data, setData] = useState({})
 
  useEffect(() => {
        
    //차트에 들어갈 데이터 호출
   axios.get(`/project/work/chart/${projectID}`).then(res =>{
    
        var sum = 0;
        res.data.result.map(item =>{
            sum = sum + item.count
        });
        const tempData = {
            //데이터 이름
            labels: res.data.result.map(item =>item.wl_work_category),
            datasets: [
                {
                  label: 'My First Dataset',
                  //데이터 값
                  data: res.data.result.map(item =>item.count),
                  //분류 데이터 색깔
                  backgroundColor: res.data.result.map((item, index)=> {
                    var per = 255/(res.data.result.length-1);
                    if(index+1 !== res.data.result.length){
                        return 'rgba('+(index)*per+', '+(index)*per+', 255, 0.5)';
                    }else{
                        return 'rgba(183, 183, 183, 0.4)';
                    }
                }),
                
                  borderWidth: 0.2,          
                },
              ],
              total : sum,

          }
        setData(tempData)   
   })
}, [])

  const options = {    
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: false,
        text: "프로젝트 진행",
        position : 'bottom'
      }
    }
  };      
  
  return (
    <div style={{paddingTop:'20px',height: '400px' ,width : '160px'}}>
      {data.total!=0?<Pie
          data = {data}
          options = {options}
          style={{}} 
        />: <div style={{textAlign:'center',marginLeft:'-60px',paddingLeft:'10px',
        width : '220px',fontSize:'15px', paddingTop:'20px',
        paddingBottom:'20px',fontWeight:'bold', fontFamily:"Noto Sans"}} >
          <span ><i style={{fontSize:'90px',color :'#5e6cdb',}} className="fas fa-chart-circle" ></i> </span>
          <p style={{marginTop:'10px'}}>등록된 업무가 없습니다.</p>
          </div>}
    </div>
  )
}

export default Doughnut3;