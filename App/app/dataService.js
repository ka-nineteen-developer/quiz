import { baseDetails } from './baseDetails';

const baseUrl = 'https://opentdb.com/';

export const categoryList = () => {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + 'api_category.php', {})
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== null){
                resolve(responseJson);
            } else {
                data = {
                    Status: 'Error'
                }
                resolve(data)
            }
        }).catch(err => {
            data = {
                Status: 'Error'
            }
            resolve(data);
        })
    })
}

export const playUrl = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {})
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== null){
                resolve(responseJson);
            } else {
                data = {
                    Status: 'Error'
                }
                resolve(data)
            }
        }).catch(err => {
            data = {
                Status: 'Error',
                err: err
            }
            resolve(data);
        })
    })
}

export const appUpdate = () => {
    return new Promise((resolve, reject) => {
        fetch(baseDetails.baseUrl + 'update.json', {})
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== null){
                resolve(responseJson);
            } else {
                data = {
                    Status: 'Error'
                }
                resolve(data)
            }
        }).catch(err => {
            data = {
                Status: 'Error'
            }
            resolve(data);
        })
    })
}

export const about = () => {
    return new Promise((resolve, reject) => {
        fetch(baseDetails.baseUrl + 'about.json', {})
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== null){
                resolve(responseJson);
            } else {
                data = {
                    Status: 'Error'
                }
                resolve(data)
            }
        }).catch(err => {
            data = {
                Status: 'Error'
            }
            resolve(data);
        })
    })
}