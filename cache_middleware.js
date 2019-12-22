//功能点1：识别请求，获取的url的xxx
//功能点2:判断是否首次，数组中是否有xxx
//功能点3:如果是首次，向服务器发出请求,执行next()
//功能点4:如果不是首次，返回xxx对应的value
//功能点5：清空缓存，判断是否0点
//相当于代理转发

// 是中间件----使用app.use语法
//koa中间件的规范:
//一个async函数 接收ctx和next两个参数 任务结束需要执行next
//假定都是get请求
class cache_middleware{
    constructor(){
         this.urlCache = {};
    }
    handleGetReq(){
        return async (ctx,next) =>{
            if (ctx.url.startsWith('/api/data')){
                console.log('当前已有缓存',this.urlCache)
                this.clearCacheOnTime();
                let urlKey =ctx.url.replace(/^\/api\/data\//, "");
                if(!this.urlCache[urlKey]){
                    this.urlCache[urlKey] = await this.getNewReq(ctx.url);
                }
                ctx.body =this.urlCache[urlKey];
            }else{
                await next();
            }     
        }
    }
    clearCacheOnTime(){
        let currentTime = new Date();
        let hours = currentTime.getHours(),
            min = currentTime.getMinutes(),
            sec = currentTime.getSeconds();
        if(hours=='0' && min=='0' && sec=='0'){
            this.urlCache ={}
        } 
    }
    getNewReq(url){
        return new Promise((reslove, reject) => {
            setTimeout(() => {
              reslove(new Date().toLocaleString());
        }, 5000); });
    }

}

module.exports = cache_middleware;
