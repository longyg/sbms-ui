import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })
        // 拦截请求
        instance.interceptors.request.use(
            config => {
                let token = Cookies.get('token')
                if (token) {
                    // 在请求头中添加token
                    config.headers.token = token
                } else {
                    // 如果没有token，重定向到登录页
                    router.push('/login')
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        // 拦截响应
        instance.interceptors.response.use(
            response => {
                return response.data
            },
            err => {
                return Promise.reject(err)
            }
        )
        // 请求处理
        instance(options).then(res => {
            resolve(res)
            return false
        }).catch(error => {
            reject(error)
        })
    })

}