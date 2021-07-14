import axios from 'axios';
import {Pie} from 'react-chartjs-2';
import React, { useState , useEffect} from 'react';

import { ProgressBar } from 'react-bootstrap';

const PieChart = ({projectID}) => {
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
        <div >
            
            <div style={{ padding : '0px 10px 10px 10px'}}>
                
                <p style={{fontSize:'23px'}}>업무 진행률</p>
                
                {/* {data.total!=0&&<p>전체 {data.datasets&&(100-(data.datasets&&data.datasets[0].data[data.datasets[0].data.length-1]/data.total*100)).toFixed(2)}%</p>} */}
                
                {data.total!=0?<div style={{ paddingLeft:'50px',width:'280px'}}>
                    <Pie
                        data = {data}
                        options = {options}
                        style={{}} 
                    />
                </div>: <div style={{textAlign:'center',marginLeft:'-60px',paddingLeft:'10px',
                        width : '190px',fontSize:'15px', paddingTop:'20px',
                        paddingBottom:'20px',fontWeight:'bold', fontFamily:"Noto Sans"}} >
                          <span ><i style={{fontSize:'70px',color :'#5e6cdb',}} class="fas fa-chart-pie" ></i> </span>
                          <p style={{marginTop:'10px'}}>등록된 업무가 없습니다.</p>
                          </div>}
            </div>
                
                {data.total!=0&&<div style={{ height:'300px'}}>
                    {data.datasets&&data.datasets[0].data.map((item ,key) => {
                        return (
                            <div style={{margin : '40px 0px 0px 20px'}}>
                                <p style={{margin : '-10px 0px 10px 0px'}}> {data.labels[key]}</p>
                                <div style={{ display: 'flex', width : '300px', height : '0px' }}>
                                    <ProgressBar style={{width : '300px', }} animated now={item/data.total*100} key={key}/> 
                                    <p style={{padding : '0px 0px 10px 20px'}}>{(item/data.total*100).toFixed(2)}%</p>
                                </div>
                            </div>
                        )
                    })}
                </div>}

           
            

                               
        </div>
    )
}

export default React.memo(PieChart);