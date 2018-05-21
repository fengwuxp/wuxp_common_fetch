
#### 基于typeScript 封装的请求服务端的js-sdk  仅支持源码依赖
 
#### 核心包--src/api
 
#### ApiClientInterface Api客户端请求接口，根据不同需求可以有不同的实现
#### ApiClientWeex是基于阿里weex stream的一个实现。
 
#### ApiClientProxyFactory:服务代理对象，统一代理进行服务端请求，在项目有多个服务的情况下可以继承它。具体可以参考：TestService
 
#### GlobalConfig:全局配置对象

#### 新增ApiClientFetch
 
#### 新增api请求filter 详见 src/api/filter
 
#### 加入去抖函数和节流函数  详见 ./src/utils/DebounceUtil.ts


#### 新增http 状态码统一处理 详见 ./src/api/error

//  "scripts":{
//    "publish":"npm unpublish --force typescript_api_sdk@0.0.2 && npm publish"
//  },
