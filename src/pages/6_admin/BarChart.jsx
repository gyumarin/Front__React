import React from 'react';
import { useEffect } from 'react';
import { Chart } from "react-google-charts";
import styles from "./BarChart.module.css";


  
const BarChart = ({thisMan, uProjects}) => {  
    // console.log(thisMan);    
    // console.log(uProjects);

    const projects = uProjects.map(i => i.p_title);    
    const percentages = uProjects.map(i=>parseFloat(i.p_percentage*100).toFixed(2));         
    
    
    const projects1 = ['프로젝트'];
    projects.map(i=> projects1.push(i))
    // console.log(projects1);

    const percentage1 = [thisMan.e_name];
    percentages.map(i=>percentage1.push(parseFloat(i)));
    // console.log(percentage1);
    
    let wholeAdd = 0;
    percentage1.forEach(i => {
        if(typeof i == 'string')return;
        wholeAdd +=i;
    });


    return(
        <div className={styles.BarChart}>  
            <div className={styles.percent}>프로젝트 참여율 : </div>      
            <div className={styles.percentNum}> {wholeAdd} / 100% </div>    
            {         
            uProjects.length != 0 &&
            <Chart  
                className={styles.barChart}         
                width={'430px'}
                height={'80px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                
                data={[
                    projects1,
                    percentage1              
                ]}
                options={{
                    title: '프로젝트 참여율',
                    chartArea: { width: '75%', backgroundColor:"aliceblue"},
                    isStacked: true,
                    hAxis: {
                        title: '  ',
                    minValue: 0,                  
                    
                    },
                    backgroundColor:"aliceblue"
                                        
            }}
            // For tests
            rootProps={{ 'data-testid': '3' }}
            />    
            }    
        </div>
    );
};  

export default BarChart;