import {ExecuteMethod} from "./model/FilterItem";

/**
 * api filter
 */
export interface ApiFilter<T, R> {

    /**
     * 执行方式默认为 ALL
     */
    executeMethod: ExecuteMethod

    /**
     * 请求之前的处理
     * @param  {T} params 请求参数
     * @return {boolean | Promise<boolean>} 返回布尔值表示：是否继续处理下一个filter 返回Promise如果状态为fulfilled则继续往下处理
     */
    preHandle(params: T): boolean | Promise<boolean>;

    /**
     * 请求之后的处理
     * @param {R} data 请求结果数据
     * @param {T} options 请求参数
     * @return {boolean} 是否继续处理下一个filter
     */
    postHandle(data: R, options: T): any;
}
