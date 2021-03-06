const Koa = require('koa')
const views = require('koa-views')
const static = require('koa-static')
const session = require('koa-session')
const router = require('./router/router')
const logger = require('koa-logger')
const body = require('koa-body')
const { join } = require('path')

const app = new Koa

app.keys = ['步惊云']

// session 的配置对象
const CONFIG = {
    key:'Sid',
    maxAge:36e5,//毫秒 1小时过期
    // autoCommit:true,
    overwrite:true,//是否覆盖
    httpOnly:true,
    // signed:true,//是否签名
    rolling:true,//是否要刷新
    // renew:false
}

//注册日志模块
// app.use(logger())

//配置koa-body 处理post的请求数据
app.use(body())

//注册session  类似 前端cookie
app.use(session(CONFIG,app))

//配置视图模块
app.use(views(join(__dirname,'views'),{
    extension:'pug'
}))
//配置静态资源目录
app.use(static(join(__dirname,'public')))

//注册路由信息
app.use(router.routes()).use(router.allowedMethods())

//监听在3000端口
app.listen(3000,() => {
    console.log('项目启动成功')
})