import axios from 'axios';

export function getCommit(sha) {
    return axios.get(`${sha}`,{
        headers: {
            Authorization: "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",
          }
    }).then((response) => {
        return response.data;
    });
}

export function getMasterList(projectName) {
    return axios.get(`https://api.github.com/repos/${projectName}/commits`,{
        headers: {
            Authorization: "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",
          }
    }).then((response) => {
        return response.data;
    });
}

export function getBranchName(projectName) {
    return axios.get(`https://api.github.com/repos/${projectName}/branches`,{
        headers: {
            Authorization: "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",
          }
    }).then((response) => {
        return response.data;
    });
}
