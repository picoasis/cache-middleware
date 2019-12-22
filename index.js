// const url = require('url');
const CacheMidWare = require('./cache_middleware');

const Koa = require('koa');
const app = new Koa();
const cachehandle = new CacheMidWare();
app.use(cachehandle.handleGetReq());
app.use((ctx,next)=>{
    ctx.body = `非/api/data查询请求: ${ctx.url}`
})



app.listen(3000);
console.log('app started at http://localhost:3000')

