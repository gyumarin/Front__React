import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AddTeamPopUp.module.css";

const AddTeamPopUp = props => {

    useEffect(() => {
        
        console.log('AddTeamPopUp',props.peopleList.find(item => item.e_id == id))
    }, [])

    const [search, setSearch] = useState(false);
    
    const [list, setList] = useState([]);

    const [inputs, setInputs] = useState({
        id: "",
        position: "",
        sName: "",
    });

    const { path } = useParams();

    const { id, position, sName } = inputs;

    const checkName = e => {
        setSearch(false);
        setInputs({
            ...inputs,
            id: e.target.value,
        });
    };

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const handleClick = event => {
        event.preventDefault();
        props.setTeamPopup(false);
    };

    const getEmployee = async (event) => {
        event.preventDefault();
        const result = await axios.get("/note/search?e_name=" + sName);
        console.log(result.data.result);
        setSearch(true);
        setList(result.data.result);
    };

    const insertProjectEmployee = () => {
        if(props.peopleList.find(item => item.e_id == id)==null){
            const result = axios.post("/project/employee/insert", {
                e_id: id,
                p_id: props.match.params.id,
                ep_position: position,
            });
            props.setTeamPopup(false);
            props.getWL();
        }else{
            alert('이미 등록된 팀원입니다. 다시 확인해 주세요.');
        }
        
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>인원 추가</h1>
                <button onClick={handleClick} className={styles.exit}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div>
                <label className={styles.label} htmlFor="input">
                    인원 검색
                </label>

                <form className={styles.search} onSubmit={getEmployee}>
                    {/* search 들어올 곳 */}
                    <input
                        id="search"
                        type="text"
                        name="sName"
                        onChange={onChange}
                        className={styles.input2}
                    ></input>
                    {/* <select
                            className={styles.select}
                            name="fName"
                            onChange={checkName}
                        >
                            <option>선택</option>
                            {list.map((value, key) => {
                                return (
                                    <option value={value.e_id} key={key}>
                                        {value.e_name}
                                    </option>
                                );
                            })}
                        </select> */}
                    <button className={styles.button1} onClick={getEmployee}>
                        검색
                    </button>
                </form>


                <div className={styles.options}>
                    {search ? (
                        <select
                            className={styles.select}
                            name="fName"
                            onChange={checkName}
                        >
                            <option>선택</option>
                            {list.map((value, key) => {
                                return (
                                    <option value={value.e_id} key={key}>
                                        {value.e_name}
                                    </option>
                                );
                            })}
                        </select>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="e_id" className={styles.label}>사원번호</label>
                    <input type="text" value={id} id="e_id" className={styles.input3}></input>
                </div>
                <label htmlFor="e_position" className={styles.label1}>포지션</label>
                <input type="text" name="position" id="e_position" onChange={onChange} className={styles.input3}></input>
                

                <input
                    className={styles.button1}
                    type="button"
                    value="추가"
                    onClick={insertProjectEmployee}
                />
            </div>
        </div>
    );
};

export default AddTeamPopUp;