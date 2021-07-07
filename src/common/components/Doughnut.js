import axios from 'axios';
import React, {useState , useEffect} from 'react';
import {Pie} from 'react-chartjs-2';

const DoughnutChart = ({projectID}) => {
  
  const [data, setData] = useState({})
 
  useEffect(() => {
        
    //차트에 들어갈 데이터 호출
   axios.get(`/project/work/chart/${projectID}`).then(res =>{    
        var sum = 0;
        res.data.result.map(item =>{
            sum = sum + item.count
        });
        // console.log(sum);
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
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{ height: '0px' ,width : '125px' }}>
        <Pie
          data = {data}
          options = {options}
          style={{}} 
        />
      </div>

      <div >
      전체 {data.datasets&&(100-(data.datasets&&data.datasets[0].data[data.datasets[0].data.length-1]/data.total*100).toFixed(2))}%
      </div>
    </div>
  )
}

export default DoughnutChart;
