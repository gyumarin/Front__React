import React , {useState, useEffect, useCallback} from 'react';
import styles from './WorkListPage.module.css';
import axios from 'axios';
import Pie from './Pie';
import Work from './Work';
import { Form, Button, Card  } from 'react-bootstrap';

const WorkListPage = ({projectID}) => {
    
    const [data, setData] = useState([])
    const [workList, setWorkList] = useState([])
    const [workView, setWorkView] = useState([])
    const [maincate, setMaincate] = useState([])
    const [midCateList, setMidCateList] = useState([])
    const [midCateAll, setMidCateAll] = useState(true)
    const [workSuccess, setWorkSuccess] = useState(0)
    const [search, setSearch] = useState({
        keyword : '',
        select:'선택',    
    })
    const [projectInfo, setProjectInfo] = useState([])

    useEffect(() => {
        console.log(workList);
    }, [workList])

    useEffect(() => {
        axios.get(`/project/detail/${projectID}`).then(res =>{
            setProjectInfo(res.data.result)
            // console.log(res.data.result.p_title)
            
        });

        axios.get(`/project/work/list/team/${5}`).then(res =>{
            setWorkList(res.data.result);
            setWorkView(res.data.result);
            setMaincate('전체')
        })

        axios.get(`/project/work/chart/${5}`).then(res=>{
            setData(res.data.result);
        });
        
    }, [])


    useEffect(() => {
        
        let tempWorkList = null;
        if(maincate=='전체'){
            setWorkView(workList);
            tempWorkList = Array.from(
                new Set(
                    workList.map(
                        item=>(item.wl_work))));
            
        }else{
            setWorkView(workList.filter(work => work.wl_work_category==maincate));
            tempWorkList = Array.from(
                new Set(
                    workList.filter(
                        work => work.wl_work_category==maincate).map(
                            item=>item.wl_work
                )))  
        }
         
        setMidCateList(tempWorkList.map(item=>({mid : item, toggle : true})));        
    }, [ maincate, search])


    useEffect(() => {
        var tmp = midCateList.map(work => {
            if(work.toggle == true){
                return work.mid
            }
        });
        var b = null;
        if(maincate=='전체'){
             b = workList.map(item =>{
                var a = null
                tmp.map(tmp =>{
                    if(item.wl_work == tmp) a= true
                 })
                if(a){ return item }}).filter(item=>item!=undefined)
        }else{
             b = workList.filter(work => work.wl_work_category==maincate).map(item =>{
                var a = null
                tmp.map(tmp =>{
                    if(item.wl_work == tmp) a= true
                 })
                if(a){ return item }
            }).filter(item=>item!=undefined)
        }
       setWorkView(b)

    }, [midCateList, search])




    const onCheckBox = (item)=>{
        
        var b= null
        if(item=='전체'){
            setMidCateAll(!midCateAll);
            b = midCateList.map(work=>{
                work.toggle = !midCateAll
                return work
            });
        }else{
            b = midCateList.map(work=> {
                if(work==item){
                    work.toggle = !work.toggle
                }
                return work
            })
        }
        setMidCateList(b);  
    }




    const onRadioBox = (Mcate) =>{
        setMaincate(Mcate);
        setMidCateAll(true);
        
    }


    const onSuccessBox = (index) =>{
        setWorkSuccess(index)
        
    }
    
    const onSelect = (e)=>{   
        setSearch({...search, select : e.target.value});
    }

    const onKeyword = useCallback((e) => {
        setSearch({...search, select: search.select, keyword : e.target.value});
    },[search])

    useEffect(() => {
        console.log(maincate)
    }, [maincate])

    const onSearch =  (event) =>{
        
        if(search.select=="선택"){
            alert('검색하실 분류를 선택해주세요. ')
        }else{
            axios.get(`/project/work/list/search/${search.select}/${search.keyword}/${5}`).then(async res =>{
                
                 setWorkList(res.data.result);
                 setWorkView(res.data.result);
                 await setMaincate('김치b')
                 await setMaincate('전체')
            })
        }        
    }

    return(        
        <div className={styles.container}>
            
            <div style={{display: 'grid',
                         gridTemplateColumns:'200px 800px 400px', 
                         gridTemplateRows: '70px 20px 120px 120px 500px'}
            }>
                <div style={{gridRow:'1/2', gridColumn:'1/3'}}>
                    <h3 className={styles.h3}>{projectInfo.p_title}
                        <font style={{marginLeft : '10px' ,fontSize:'18px', color : 'rgba(1, 1, 1, 0.3)'}}>업무 리스트</font>
                    </h3>
                </div>
                <div></div>
                    
                <div style={{ gridColumn:'2/3', gridRow:'1/4' , height: '100px', 
                    display:'flex', margin:'11px 7px 0px 7px', padding:'85px 0px 0px 0px'}}>
                
                    {/* 1. 수행 여부 */}
                    <Card style={{height: '90px', margin: '5px'}} className={styles.card1}>
                        <Form style={{margin: '3px',padding:'10px 0px 0px 10px', width: '280px'}}>
                            <p style={{fontWeight :"bold"}}>수행 여부</p>
                            <Form.Check 
                                inline
                                checked={workSuccess==0}
                                label= "전체"
                                type="radio"
                                onChange={()=> onSuccessBox(0)}
                                name="group"
                                
                            />
                            <Form.Check
                                inline
                                checked={workSuccess==1}
                                label= "완료"
                                type="radio"
                                onChange={()=> onSuccessBox(1)}
                                name="group"
                                
                            />
                            <Form.Check
                                inline
                                checked={workSuccess==2}
                                label= "미완료"
                                type="radio"
                                onChange={()=> onSuccessBox(2)}
                                name="group"
                                
                                
                            />
                        </Form>
                    </Card>

                    {/* 검색 조회 */}
                    <Card style={{ 
                        backgroundColor: 'white', 
                        width:'500px',
                        height: '90px',
                        display: 'grid',
                        gridTemplateColumns:'90px 100px 200px 70px', 
                        margin: '5px',
                        padding:'10px 0px 0px 0px'}
                    }>
                        <p style={{padding:'0px 5px 0px 15px', fontWeight:"bold"}}>검색 조회</p>
                        <div style={{padding:'30px 5px 0px 0px'}}>

                            <select 
                                style={{
                                    height : '35px', 
                                    width:'100px', 
                                    padding:'0px 5px 0px 5px'
                                }}
                                value={search.select}
                                onChange={onSelect}
                            >
                                <option>선택</option>
                                <option value="e_name" >업무 담당자</option>
                                <option value="wl_work_detail" >세부 업무</option>
                                
                            </select>  
                        </div>   
                    
                    <Form style={{gridColumn:'3/4' ,padding:'30px 5px 0px 5px' }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control style={{ height: '35px'}}type="text" onChange={onKeyword} value={search.keyword} placeholder="검색어"  />
                        </Form.Group>
                    </Form>
                    <div style={{padding:'30px 5px 0px 0px'}}>
                        <Button style={{height: '35px', width: '70px', gridColumn:'4/5' }}variant="primary" type="submit" onClick={onSearch}>
                                검색
                        </Button>
                    </div>
                </Card>

                </div>


                
                <Card style={{ gridColumn:'1/2', gridRow:'3/5',height: '195px', margin : '45px 5px 5px 35px', padding:'20px'}}>
                
                    <Form style={{ }}>    
                        <p>업무 대분류</p>
                        <Form.Check
                                inline
                                checked={maincate=="전체"}
                                label= "전체"
                                type="radio"
                                onChange={()=> onRadioBox("전체")}
                                name="big"
                                style={{paddingBottom:'10px'}}
                                
                            />
                        {data.map((item, index)=>{
                            if(index!==data.length-1){
                                return (<Form.Check
                                    inline
                                    checked={maincate==item.wl_work_category}
                                    label= {item.wl_work_category}
                                    type="radio"
                                    onChange={()=>onRadioBox(item.wl_work_category)}
                                    name="big"
                                
                                />)
                            }
                        })}
                    
                    </Form>
                </Card>
                <div></div>


                <Card style={{gridColumn:'3/4', gridRow:'2/6', padding:'40px 0px 0px 20px', margin : '30px 5px 5px 5px', height :'710px'}}> 
                    <Pie projectID={5} />
                </Card>
                
                
                <Card style={{ padding : '0px', gridColumn:'2/3', gridRow:'4/6', margin : '4px 10px 10px 10px', height :'610px'}}>
                    <p style={{margin:'13px 0px 10px 20px'}}>업무 리스트</p>
                    <div className={styles.workView} >
                    {
                        workView[0]&&workView.map((item, index) =>{
                            if(workSuccess==0){return <Work data={item} key={index}/>}
                            else if(workSuccess==1){if(item.wl_done)return <Work data={item} key={index}/>}
                            else if(workSuccess==2){if(item.wl_done==false)return <Work data={item} key={index}/>}
                            
                        })
                    }
                    </div>
                                        
                </Card>
                
                {/* 업무목록 */}
                <Card style={{margin : '10px 5px 5px 35px', height: '510px'}}>
                    <Form style={{ margin: '10px',padding:'10px',  }}>
                        <p>업무 목록</p>
                        <div><Form.Check
                            inline
                            onChange={()=>onCheckBox("전체")}
                            checked={midCateAll}
                            label="전체"
                            name="group2"
                            type="checkbox"
                            id={`inline-checkbox-1`}
                        /></div>
                        {
                            midCateList[0]&&midCateList.map(item=>{
                            return (
                                <div>
                                <Form.Check
                                inline
                                onChange={()=>onCheckBox(item)}
                                checked={item.toggle}
                                label={item.mid}
                                name="group2"
                                type="checkbox"
                                id={`inline-checkbox-1`}
                            /></div>
                            )
                            })        
                        }
                    </Form>
                </Card>
            </div>            
        </div> 
        
    );
};
export default WorkListPage;