import axios from 'axios';

export function getCommit(sha) {
    return axios.get(`${sha}`).then((response) => {
        return response.data;
    });
}

export function getMasterList(projectName) {
    return axios.get(`https://api.github.com/repos/${projectName}/commits`).then((response) => {
        return response.data;
    });
}

export function getBranchName(projectName) {
    return axios.get(`https://api.github.com/repos/${projectName}/branches`).then((response) => {
        return response.data;
    });
}

// export function getBranchSha(brenchName, projectName) {
//     if (brenchName == '') {
//         return axios.get(`https://api.github.com/repos/${projectName}/commits`).then((response) => {
//             // console.log('response', response);
//             return response.data[0];
//         });
//     }
//     return axios.get(`https://api.github.com/repos/${projectName}/commits/${brenchName}`).then((response) => {
//         return response.data;
//     });
// }
