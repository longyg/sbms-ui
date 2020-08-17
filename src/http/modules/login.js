import axios from '../axios'

// 登录
export const login = (data) => {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}

export const logout = () => {
    return axios({
        url: '/logout',
        method: 'get'
    })
}