import {ApiConfig} from "./ApiConfig";


const ConfigImpl = require("../../../../src/config/GlobalConfig").default;

const ApiConfig: ApiConfig = new ConfigImpl() as ApiConfig;
console.log(ApiConfig);
export default ApiConfig;

//从环境比变量中读取配置
// const ApiConfig: ApiConfig = process.env.GLOBAL_CONFIG as ApiConfig;
// console.log(ApiConfig);
// export default ApiConfig;
