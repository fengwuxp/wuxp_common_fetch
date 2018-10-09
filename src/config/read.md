
##### GlobalApiConfig 中 依赖import ConfigImpl from "../../../../src/config/GlobalConfig"; 所以在依赖该模块项目的src目录下

##### 需要要有一个config目录并且目录下要有GlobalConfig.ts文件继承 ApiConfig接口

#### 将配置拆分 ApiConfig 只关心Api请求相关的配置
