# cache-middleware
一个基于内存的缓存中间件  假定api/data/xxx下的所有数据查询接口查询时间长，影响页面加载速度，且数据在0点才会自动刷新，希望开发一个接口缓存功能。  koa中间件的规范: 一个async函数 接收ctx和next两个参数 任务结束需要执行next
