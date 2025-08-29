const Mock = require('mockjs')

//post请求，模拟登录
module.exports = Mock.mock('/getExams', 'post', (options) => {
    const data = JSON.parse(options.body).data
    if (data.userId == '' || data.userId == null || data.userId == undefined) {
        return {
            success: 0,
            status: 200,
            message: '用户ID不能为空'
        }
    }
    const exams = []
    exams.push({
        id: 'exam1',
        name: '2024年国家公务员考试',
        date: '2024-11-28',
        tag: '国家考试',
        days: 62,
        hours: 15,
        minutes: 28,
        seconds: 46
    },
        {
            id: 'exam2',
            name: '2024年省考联考',
            date: '2024-03-30',
            tag: '省级考试',
            days: 128,
            hours: 10,
            minutes: 45,
            seconds: 22
        },
        {
            id: 'exam3',
            name: '2024年事业单位考试',
            date: '2024-05-15',
            tag: '事业单位',
            days: 174,
            hours: 8,
            minutes: 12,
            seconds: 33
        })


    return {
        success: 1,
        status: 200,
        data: exams
    }
})