import {ApiResp} from "./ApiResp";
import {PageInfo} from "./PageInfo";

/**
 * Created by wuxp on 2017/5/4.
 * 统一查询响应对象
 */
export interface ApiQueryResp<T=any> extends ApiResp<PageInfo<T>> {

    /**
     * 请求结果列表的第一个元素
     */
    readonly one: T,

    /**
     * 请求结果列表是否为空
     */
    readonly notEmpty: boolean
}
