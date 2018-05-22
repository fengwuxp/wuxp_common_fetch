import {ReqMethod} from "../enums/ReqMethod";
import {DataType} from "../enums/DataType";

/**
 * 基础Api options
 */
export interface BaseApiOptions {

    /**
     * 请求url
     */
    url?: string;

    /**
     * 查询参数
     */
    queryPrams?: any;

    /**
     * 请求方法
     */
    method?: ReqMethod;

    /**
     * 结果数据类型
     */
    dataType?: DataType;

    /**
     * 请求头
     */
    headers?: any;

    /**
     * 请求参数，请求需要
     */
    data?: any;

    /**
     * 参与签名的参数列表
     */
    signFields?: Array<string>;

    /**
     * 使用进度提示条
     */
    useProgressBar?: Boolean;

    /**
     * 环境上下文
     * 在发起请求是传入当前上下文，可以用于在filter中进行处理，
     * 仅对当前请求生效
     */
    context?: BaseApiContext;

    /**
     * 是否使用统一的filter拦截
     * useFilter明确为false是不使用过滤器
     */
    useFilter?: boolean;

}

export interface BaseApiContext {

    [key: string]: any

    /**
     * 响应的完整数据将会传入该函数，该回调将会在promise之前被执行
     * @param p
     */
    resp: (...p) => void;
}
