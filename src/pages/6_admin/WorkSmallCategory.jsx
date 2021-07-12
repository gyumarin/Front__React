import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminWorkListCard from './AdminWorkListCard';
import styles from './WorkSmallCategory.module.css';

                          
const WorkSmallCategory = ({ smallCategoryId, bigCategoryName, midCategoryName, selectedMan,setSelectedMan }) => {
    // console.log(smallCategoryId);
     // state
    const newDetail = useRef("");
    const startTime = useRef("");
    const EndTime = useRef("");

    const [teamList, setTeamList] = useState([]); 
    const [charge, setCharge] = useState({});
    const [updateDetails, setUpdateDetails] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    const param = useParams();
    const projectId = parseInt(param.id);

    const[wld, setWld] = useState([]);

    const getWL = async () => {
        const result = await axios.get(
            "/project/work/detail/list/" + projectId
        );
        await setWld(result.data.result.wld);             
    };

    useEffect(() => {
        getWL();
    }, [wld]);

    // method
    const smallCategoryData = wld.filter(item=>{
        return item.m_id == smallCategoryId;
        }            
    );    
    // console.log(smallCategoryData);
    
    useEffect(()=>{
        axios.get(`/project/list/emp/${projectId}`)
        .then(res=>{            
            setTeamList(res.data.result)
        });
    },[]);    
    
    useEffect(()=>{
        if(selectedMan == 0){
            const selected = teamList.find(man =>{
                return man.e_id == updateDetails.e_id;
            })
            setCharge(selected);
        }
        else{
            const selected = teamList.find(man =>{
                return man.e_id == selectedMan;
            })
            setCharge(selected);
        }        
    },[selectedMan]);

    // for update Image
    useEffect(()=>{
        const selected = teamList.find(man =>{
            return man.e_id == updateDetails.e_id;
        })
        console.log("adf",selected);
        setCharge(selected);
    },[updateDetails]);

    const onCreateNewDetails=(event)=>{
        event.preventDefault();
        
        alert("프로젝트가 등록되었습니다.");
        axios.post("/project/work/insert",{
            p_id : projectId,
            wl_work_category : bigCategoryName,
            wl_work:  midCategoryName,
            wl_work_detail :  newDetail.current.value == "" ? "세부업무 내용 없음" : newDetail.current.value,
            wl_date_start :startTime.current.value == "" ? "시작일 없음" : startTime.current.value,
            wl_date_end : EndTime.current.value == "" ? "마감일 없음" : EndTime.current.value,
            e_id : selectedMan
        });
        
        newDetail.current.value = '';
        setSelectedMan(0);
        startTime.current.value = '';
        EndTime.current.value = '';       
    }

    const onUpdateDetails =(event) =>{
        event.preventDefault();
        alert("프로젝트가 수정되었습니다.");
        axios.put("/project/work/update",{
            p_id : projectId,
            wl_work_category : bigCategoryName,
            wl_work:  midCategoryName,
            wl_id : updateDetails.wl_id,
            wl_work_detail : newDetail.current.value,
            wl_date_start : startTime.current.value,
            wl_date_end : EndTime.current.value,
            e_id : selectedMan == 0 ? updateDetails.e_id : selectedMan
        });

        newDetail.current.value = '';
        setSelectedMan(0);
        startTime.current.value = '';
        EndTime.current.value = '';     
        setUpdateDetails({});  
        setIsUpdate(false); 
    }


    const onChange =(e)=>{
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUpdateDetails({
      ...updateDetails, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
    }


// ---------------------------------------------------------------------
    return(
        <div className={styles.container}>
            <div className={styles.title}>세부업무 등록</div>   
           
            <div className={styles.content}>   
                <form action="get" onSubmit={onCreateNewDetails} className={isUpdate ? styles.updateFormContainer: styles.formContainer}>
                    <div className={styles.upper}>

                        <div className={styles.formCategory}>
                            <div style={{height:"50%", display:"flex"}}>
                                <div style={{fontWeight: "bold",  width:"30%", textAlign:"left"}}>카테고리 : </div> <div style={{width:"100%", textAlign:"left", border : '1px solid gray', borderRadius:"5px", paddingLeft : "0.5em"}}>{bigCategoryName == "" ? '카테고리를 선택해주세요' : bigCategoryName}</div>
                            </div>
                            <div style={{height:"50%", display:"flex", marginTop: "0.5em"}}>
                                <div style={{fontWeight: "bold",  width:"30%", textAlign:"left"}}>업무 : </div>  <div style={{width:"100%", textAlign:"left", border : '1px solid gray', borderRadius:"5px", paddingLeft : "0.5em"}}>{midCategoryName == ""? '업무를 선택해주세요' : midCategoryName}</div>
                            </div>
                            
                        </div>

                        <div className={styles.formCharge}>
                            <label className={styles.lableCharge}>담당자 : </label> 
                            <div className={styles.selectedCharge}>                             
                            {
                                charge &&
                                <>
                                    <img
                                        className={styles.image}
                                        src={charge == null ? null : charge.e_photo}
                                        // alt="face image"
                                        
                                    />
                                    <div className={styles.card}>                                
                                            <div className={styles.text1}>{charge == null ? null : charge.ep_position}</div>
                                            <div className={styles.text2}>{charge == null ? '' : charge.e_name}{charge == null ? null : '-'}{charge == null ? null : charge.e_rank}</div>
                                    </div>
                                </>
                            }     
                            {
                                charge == null && <p style={{marginTop:"0.8em", marginLeft:"0.3em"}}>담당자 선택해주세요</p>
                            }                                                     
                            </div>
                        </div>

                        <div className={styles.formDate}>
                            <div className={styles.dateContainer}>
                                <label className={styles.dlabel} htmlFor="start">시작일 :</label>
                                    <input ref = {startTime} className={styles.inputDate} id="start" type="date" placeholder="세부 업무" name="d_start" value = {updateDetails.d_start}  onChange={onChange}/>                                                             
                            </div>
                            <div className={styles.dateContainer1}>
                                <label className={styles.dlabel} htmlFor="end">마감일 :</label>                               
                                    <input ref={EndTime} className={styles.inputDate} type="date" placeholder="세부 업무" name="d_end" value={updateDetails.d_end}  onChange={onChange}/>                               
                            </div>
                        </div>
                    </div>             

                    <div className={styles.formDetails}>
                        <div className={styles.labelDetail} htmlFor="title">세부 업무</div>                       
                            <input ref={newDetail} id="title" className={styles.inputTitle} type="text" id="1" name="d_name" value={updateDetails.d_name}  onChange={onChange} />                         
                    </div>   
                    {
                        isUpdate ?
                        <input type="button" onClick={onUpdateDetails} value="프로젝트 수정" className={styles.button}/>
                        :
                        <input type="button" onClick={onCreateNewDetails} value="프로젝트 등록" className={styles.button}/>
                    }
                    
                </form>

                <div className={styles.workListTitle} htmlFor="title">업무 리스트 관리</div>
                <div className={styles.workList}>
                    {
                       smallCategoryData.map(details=>{
                            return(
                                <AdminWorkListCard 
                                    midCategoryName ={midCategoryName}
                                    setUpdateDetails ={setUpdateDetails}
                                    details={details}
                                    setIsUpdate= {setIsUpdate}
                                />
                            )
                        })
                    }    
                    
                </div>                
           
                
            </div>
        </div>
    );
};

export default WorkSmallCategory;