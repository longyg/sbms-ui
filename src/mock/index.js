import Mock from 'mockjs'
import { baseUrl } from '@/utils/global'
import * as login from './modules/login'
import * as user from './modules/user'

// 1. 开启/关闭[所有模块]拦截, 通过调[openMock参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 3. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
let openMock = true
fnCreate(login, openMock)
fnCreate(user, openMock)

function fnCreate(mod, isOpen = true) {
    if (isOpen) {
        for (var key in mod) {
            ((res) => {
                if (res.isOpen !== false) {
                    let url = baseUrl
                    if (!url.endsWith("/")) {
                        url = url + "/"
                    }
                    url = url + res.url
                    Mock.mock(new RegExp(url), res.type, (opts) => {
                        opts['data'] = opts.body ? JSON.parse(opts.body) : null
                        delete opts.body
                        console.log('\n')
                        console.log('%cmock拦截, 请求: ', 'color:blue', opts)
                        console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
                        return res.data
                    })
                }
            })(mod[key]() || {})
        }
    }
}