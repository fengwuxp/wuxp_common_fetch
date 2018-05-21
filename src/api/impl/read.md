#### fetch 原生支持率并不高，幸运的是，引入下面这些 polyfill 后可以完美支持 IE8+：
##### 参考文章1：https://github.com/nodejh/nodejh.github.io/issues/15
##### 参考文章2：https://github.com/camsong/blog/issues/2

     由于 IE8 是 ES3，需要引入 ES5 的 polyfill: es5-shim,es5-sham   https://github.com/es-shims/es5-shim
     
     引入 Promise 的 polyfill: es6-promise       https://github.com/stefanpenner/es6-promise
     
     引入 fetch 探测库： fetch-detector           https://github.com/camsong/fetch-detector
    
     引入 fetch 的 polyfill: fetch-ie8           https://github.com/camsong/fetch-ie8
     
     可选：如果你还使用了 jsonp，引入 fetch-jsonp   https://github.com/camsong/fetch-jsonp
     
     可选：开启 Babel 的 runtime 模式，现在就使用 async/await
     
#### 在使用之前需要掌握Promise的相关知识
     
#### Api调用     

     导入 import apiClient from "../../api/impl/ApiClientFetch";
         import buildFetchOption from "../option/FetchOption";
     1：提供get post2个方法
     2：请求数据类型支持 JSON, SONP,HTML SCRIPT,TEXT, IMAGE(具体使用情况还需要做测试)
     3：数据提交和文件上传
     4：代码示例
     
      let req = buildFetchOption({
                     url,
                     dataType: DataType.HTML,
                     data: params,
                     useProgressBar:false
       });
         apiClient.post(req).then((data) =>{
              //do something...
         }).cache((response: Response)=>{
             //请求出错
         }).finally(()=>{
            //请求完成
         });
     
#####     