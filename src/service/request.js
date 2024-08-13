import axios from 'axios'
import { message } from 'antd';
const instance = axios.create({
    timeout: 30000
})

// 请求拦截器 在发起http请求之前的一些操作
// 1、发送请求之前，加载一些组件
// 2、某些请求需要携带token，如果说没有没有携带，直接跳转到登录页面
instance.interceptors.request.use((config) => {
    // console.log('被拦截做的一些操作1')
    return config
}, err => {
    return err
})

// 响应拦截器
instance.interceptors.response.use((res) => {
    if (!res.data.success) {

        switch (res.data.results) {
            case "logout":
                console.log('请登录')
                localStorage.setItem("loginState", false)
                window.location.href = "/#/login"
                break
            default:
            // console.log('其他信息错误')
        }
    }
    return res
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log('请求错误')
                break
            case 401:
                console.log('未认证')
                break
            default:
                console.log('其他信息错误')
        }
    }
})

export default instance;

