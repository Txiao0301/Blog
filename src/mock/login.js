const Mock = require('mockjs')

//post请求，模拟登录
module.exports = Mock.mock('/login', 'post', (options) => {
    const data = JSON.parse(options.body).data
    if (data.username != 'admin' && data.password != 'password') {
        return {
            success: 0,
            status: 200,
            message: '账号密码不对'
        }
    }
    return {
        success: 1,
        status: 200,
        data: data
    }
})