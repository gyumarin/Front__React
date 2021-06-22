import axios from 'axios';

// 	1.1. 로그인
export function login(userID, pwd) {
    return axios
        .post('employee/signin', {
            e_id: userID,
            e_password: pwd,
        })
        .then((response) => response.data);
}

//누를 때마다 insert되는거 막아야 함.
// 	1.2. 줄근부 출근
export const workingOn = (token) => {
    axios
        .post('employee/start', {
            token: token,
        })
        .then((response) => console.log('success', response.data.code));
};
// 	1.3. 출근부 퇴근
export const workingOff = (token) => {
    axios
        .post('employee/end', {
            token: token,
        })
        .then((response) => console.log('success', response.data.code));
};

//  1.8 출근부 리스트 조회
export const commuteView = (token) => {
    return axios.get(`employee/commute/list?token=${token}`).then((response) => response.data.result);
};

// 	1.4. 사원 전체 리스트
export const empAllListView = () => {
    return axios.get('employee/list').then((response) => response.data.result);
};

// 	1.5. 사원 정보 상세 조회
export const empDetail = (token) => {
    return axios.get(`employee/detail?token=${token}`).then((response) => response.data.result);
};
// 	1.6. 사원 상세 비밀번호 수정
export const empPwdChange = (token, pwd) => {
    return axios
        .post('employee/detail/pwd', {
            token: token,
            e_password: pwd,
        })
        .then((response) => response.data.result);
};
// 	1.7. 사원 상세 기타 수정
export const empInfoChange = (token, user) => {
    const { phone, officePhone, email, address, nickname } = user;
    return axios
        .post('employee/detail', {
            token: token,
            e_p_phone: phone,
            e_e_phone: officePhone,
            e_email: email,
            e_address: address,
            e_nickname: nickname,
        })
        .then((response) => response.data.result);
};
