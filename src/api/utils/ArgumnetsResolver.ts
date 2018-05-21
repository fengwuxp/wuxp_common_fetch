import {BaseApiOptions} from "../base/BaseApiOptions";
import {ReqMethod} from "../enums/ReqMethod";
import ApiReqFactory from "../../utils/ApiReqFactory";
import {isUndefined} from "util";
import {DataType} from "../enums/DataType";
import {ApiReq} from "../model/ApiReq";

/**
 * 代理接口参数解析
 * @param params
 *   params[0] : 请求的url,
 *   params[1] ： 需要签名的参数列表
 *   params[2] ： 请求的参数列表
 *   params[3] ： 请求的配置列表
 * @return {T}
 */
export function argumentsResolver<T extends BaseApiOptions>(...params): T {


    const baseOptions: any = {
        useProgressBar: true,
        url: params[0],
        //参与签名的请求参数
        signFields: params[1],
    };

    const options: T = Object.assign({}, baseOptions, params[3]);

    //请求的数据
    options.data = isUndefined(params[2]) ? ApiReqFactory.newInstancesReq({}) : Object.assign({}, params[2]) as ApiReq;

    //请求方法
    options.method = options.method as ReqMethod || ReqMethod.POST;

    //结果数据类型
    options.dataType = options.dataType as DataType || DataType.JSON;


    return options;

}
