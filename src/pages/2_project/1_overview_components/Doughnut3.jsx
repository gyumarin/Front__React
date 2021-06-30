import axios from 'axios';
import React, {useState , useEffect} from 'react';
import {Pie} from 'react-chartjs-2';

const Doughnut3= (props) => {
  // useEffect(() => {
  //     axios.get('/employee/dept').then(res =>{
  //         console.log(res.data.result);
  //     })
  // }, [])

  const [data, setData] = useState({
    labels : ['google', 'naver', 'SAP','google', 'naver'],   
    datasets: [
      {
        label: 'My First Dataset',        
        data: [50, 10, 10,10, 7],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',          
        ],
        borderColor: [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
          
          ],
          borderWidth: 1,
        },
      ],
    }
  )   

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
    <div style={{height: '400px' ,width : '160px'}}>
      <Pie
        data = {data}
        options = {options}
        style={{}} 
      />
    </div>
  )
}

export default Doughnut3;

