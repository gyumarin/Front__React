import React, { useState, useEffect,  } from 'react';
import { getBranchName, getMasterList, getCommit } from './commit'
import CommitCard from './CommitCard';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import styles from './CommitListPage.module.css';

const CommitTest = ({ projectInfo }) => {

    const tmp = sessionStorage.getItem("token").slice(0, -1).substr(1);

    const getUser = async () => {
        const result = await axios.get("/employee/detail?token=" + tmp);
        setNick(result.data.result.e_nickname);
    };



    //특정 코드(사용자)가 아니라면.... 수정할수 없도록 해야한다.
    const projectName = projectInfo.e_nickname+'/'+projectInfo.p_giturl;
    
    const [nick, setNick] = useState(""); 
   
    const [masterList, setMasterList] = useState([]);
    const [branchs, setBranchs] = useState([]);
    const [array, setArray] = useState([]);
    const [commit, setCommit] = useState({ name: '', commits: null });
    const [useBranch, setuseBranch] = useState('master');
    const [view, setView] = useState([]);
    const [toggle, setToggle] = useState(true); 

   
    /*
        // ↓ 완료 사항
        // 시작할 때 master를 불러 온다.
        // 마스터는 화면에 바로 뿌려준다.

        시작할때 브랜치 목록을 불러 온다.
        불러온 브랜치 목록을 버튼으로 만든다.
        블랜치 목록의 sha키를 이용해 첫번째 브랜치 정보를 받아 각자 객체를 만든다.

        불러온 브랜치 별로 브랜치객체를 만든다.
    */

    useEffect(() => {
        getBranchName(projectName).then((res) => {
            setBranchs(res);
        });

        getMasterList(projectName).then((res) => {
            
            setMasterList(res);
        });

        getUser();
    }, [projectInfo]);

  
    useEffect(() => {
        branchs.map((branch) => {
            getCommit(branch.commit.url).then((res) => {
                // console.log('committer',res.committer.login)
                setCommit({ name: branch.name, commits: res, top: true });
            });
        });
    }, [branchs]);



    useEffect(() => {
        if (commit.commits != null) {
            setArray(array.concat(commit));
        }
        setView(array.filter((item) => useBranch === item.name));
    }, [commit]);

    
    //브랜치 별 버튼 생성
    const onClick = () => {
        array.map((branch) => {
            //이름이 현재 브랜치이고  부모 commit을 가져오지 않았을 때 수행
            if (branch.name === useBranch && branch.top === true) {
                try {
                    getCommit(branch.commits.parents[0].url).then((res) => {
                        setCommit({ name: branch.name, commits: res, top: true });
                    });
                } catch {
                    setCommit({ name: '더는 추가할 수 없습니다.', commits: '못함', top: false });
                }

                if (commit.commits != null) {
                    setArray(array.concat(commit));
                }
                setView(array.filter((item) => useBranch === item.name));

                //조회하여 부모 commit을 가져왔기 때문에 top은 false로 변경
                setArray(array.map((item) => (branch.name === item.name ? { ...item, top: false } : item)));
            }
        });
    };

    const chooseBrench = (name) => {
        setView(array.filter((item) => name === item.name));
        setuseBranch(name);
        setToggle(false);
    };

    const masterBrench = () => {
        setuseBranch('master');
        setToggle(true);
    };

    
    return (

        
        <div style={{  display:'grid' ,gridTemplateColumns:'330px 1235px', gridTemplateRows:' 140px 440px 140px '}}>

             {/* 마스터 버튼*/}
             <Card style={{ margin: '10px', padding: '20px', borderRadius:"10px", backgroundColor:"aliceblue" }}>
                <font style={{marginLeft : '80px', marginBottom:'-5px' ,fontSize:'18px', fontWeight : 'bold',  color : "#263238"}}>마스터 브런치</font>
                <Button  style={{ margin: '15px 5px 5px 35px', width:'200px', backgroundColor:"#00aaef", border :'none',fontWeight:'bold', fontSize:'1.2em', borderRadius:"10px" }} onClick={() => masterBrench()}>
                    <p style={{marginBottom: '0px'  }}>master</p>
                </Button>
            </Card>
            
            {/* 브런치 목록 버튼*/}
            <Card style={{ 
                gridColumn:'1/2', 
                gridRow:'3/4',
                borderRadius:"10px",
                margin: '10px', padding: '20px',}}>
                    <font style={{marginLeft : '10px', marginBottom:'' ,fontSize:'18px', fontWeight : 'bold',  color : "#263238", overflow:'hidden' , width:'100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{projectInfo.p_title}</font>
                    <font style={{marginLeft : '10px', marginBottom:'10px' ,fontSize:'12px', fontWeight : 'bold',  color : "#263238"}}>https://github.com/{projectInfo.e_nickname+'/'+projectInfo.p_giturl}</font>
                    <a href={`https://github.com/${projectInfo.e_nickname+'/'+projectInfo.p_giturl}`} target='_blank'><font style={{marginLeft : '130px', fontSize:'18px', fontWeight : 'bold',  color : "#263238"}}>Git 저장소 이동</font></a>
                    
            </Card>

                
            <Card style={{ 
                margin: '10px', 
                padding: '20px',  
                gridColumn:'1/2', 
                gridRow:'2/3',
                borderRadius:"10px", 
                backgroundColor:"aliceblue"  
            }}>
                <font style={{ marginBottom:'-5px' ,fontSize:'18px',  fontWeight : 'bold',  color : "#263238", marginBottom:"1em"}}>브런치 목록 
                    <font style={{
                        marginLeft : '150px', 
                        marginBottom:'-5px' ,
                        fontSize:'18px',
                        color:'#007bbc',
                        width: "50px",
                        height : "50px"
                    }}
                    >
                        {branchs.length!=0&&<b>{branchs.length-1}</b>}
                    </font>
                </font>
                
                {branchs.map((item, key) => {
                    if (item.name !== 'master') {
                        return (
                            <Button style={{ margin: '15px 5px 5px 0px' ,textAlign:'left', backgroundColor : "#00aaef", border : "none", borderRadius : "15px", height  : "50px"}} value={item.name} key={key} onClick={() => chooseBrench(item.name)}>
                                <p style={{marginBottom: '0px'  }}>{item.name}</p>
                               
                            </Button>
                        );
                    }
                })}
            </Card>
            <Card style={{ gridColumn:'2/3', gridRow:'1/4', padding : '30px', margin: '10px', borderLeft : '20px solid  #007bbc', borderRadius : "20px"}} >
                <h5 style={{fontWeight:"bold"}}>Commit List<font style={{marginLeft : '16px' ,fontSize:'13px', color : 'rgba(1, 1, 1, 0.3)'}}><b>{useBranch}</b></font></h5>
                
               <div className={styles.workView} style={{marginTop:'20px',paddingTop:"20px"}}>
                {toggle === true
                    ? masterList.map((commit, key) => {
                        return <CommitCard info={commit} nick={nick} key={key} projectInfo={projectInfo}/>;
                    })
                    : view.map((commit, key) => {
                        return <CommitCard info={commit.commits} nick={nick} useBranch={ useBranch }key={key} projectInfo={projectInfo}/>;
                    })}
                </div>
                <hr/>
                {!toggle&& <Button style={{width:'300px', marginLeft:'400px'}}onClick={onClick}>더 보기</Button>}
            </Card>            
        </div>
    );
};

export default CommitTest;