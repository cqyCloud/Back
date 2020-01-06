const Router = require('koa-router')

const router = new Router

router.get("/",async ctx => {
    await ctx.render("index",{
        session:"首页"
    })
})

router.get("*",async ctx => {
    await ctx.render("404",{
        title:"404"
    })
})

module.exports = router