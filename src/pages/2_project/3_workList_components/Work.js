import React, {useEffect} from 'react'
import { Card, Button, Form } from 'react-bootstrap';
const Work = ({data}) => {
    const date = new Date();    
    return (
        <div>
            <Card style={{margin : '8px', paddingLeft : '5px' ,height : '90px', fontSize : "0.9em"}}>
                    <Card.Body style={{ padding : '10px', display: 'grid', gridTemplateRows: '20px 25px 20px',gridTemplateColumns:'15px 100px 10px 430px 215px 50px',marginBottom:'0px', height: '80px'}}>
                        <Card.Text  style={{ fontSize:'11px', color : 'rgba(183, 183, 183, 0.8)'}}>{data.wl_id}</Card.Text>
                        <Card.Text style={{gridColumn :'2/4', gridRow :'1/2', fontSize:'11px', color : 'rgba(255, 183, 183, 0.8)'}}>{data.wl_work_category}</Card.Text>
                        
                        <Card.Text style={{gridColumn :'5/7', gridRow :'1/2'}}> {data.wl_date_start} ~ {data.wl_date_end}</Card.Text>     
                        <Card.Text style={{gridColumn :'6/7', gridRow :'1/2', marginRight : '5px', textAlign:'right'}}> {
                            Math.floor((new Date(data.wl_date_end).getTime() - new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).getTime())/ (1000*60*60*24))<0
                            ? "만료" 
                            : "D-" + Math.floor((new Date(data.wl_date_end).getTime() - new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).getTime())/ (1000*60*60*24))
                        }</Card.Text>     
                        
                        <Card.Text style={{gridColumn :'2/3', gridRow :'2/3'}}>업무</Card.Text>
                        <Card.Text style={{gridColumn :'3/4', gridRow :'2/3'}}> :</Card.Text>
                        <Card.Text style={{gridColumn :'4/5', gridRow :'2/3' }}>{data.wl_work}</Card.Text>
                        <Card.Text style={{marginLeft: '73px',gridColumn :'5/6' , gridRow :'2/3', color : 'rgba(1, 1, 1, 0.5)'}}> 작업자 : {data.e_name}</Card.Text>
                        <div style={{marginLeft: '25px', gridRow :'3/4', gridColumn :'6/7', borderRadius : '50%', width : '20px', height :'20px', backgroundColor : `${data&&(data.wl_done==3?'blue':(data.wl_done==1?'red':'orange'))}`}}/>
                        <Card.Text style={{gridColumn :'2/3'}}>세부 업무</Card.Text>
                        <Card.Text >:</Card.Text>
                        <Card.Text style={{gridColumn :'4/6', overflow:'hidden' , width:'100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{data.wl_work_detail}</Card.Text>
                            
    
                    </Card.Body>  
                </Card>
        </div>
    )
}

export default Work