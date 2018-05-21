/**
 * api filter
 */

export interface ApiFilter {

    /**
     * 请求之前的处理
     * @param params 请求参数
     * @return {boolean | Promise<boolean>} 返回布尔值表示：是否继续处理下一个filter 返回Promise如果状态为fulfilled则继续往下处理
     */
    preHandle(params: any): boolean | Promise<boolean>;

    /**
     * 请求之后的处理
     * @param data 请求结果数据
     * @param context 请求上下文
     * @return {boolean} 是否继续处理下一个filter
     */
    postHandle(data: any, context?: any): any;
}
