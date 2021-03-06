import {ApiFilter} from "../ApiFilter";
import {UrlPattern} from "./UrlPattern";

/**
 * 执行方式
 */
export enum ExecuteMethod {

    //只在请求成功的时候做处理
    ONLY_SUCCESS,

    //只在失败的时候执行
    ONLY_ERROR,

    //只执行前置方法
    ONLY_PREV,

    //只执行后置方法
    ONLY_POST,

    ALL

}

/**
 * 过滤器配置项
 */
export interface FilterItem {

    /**
     * 匹配表示式
     * 例如：/memberService/*  string
     *
     *    ["/member/xx","/order/xx"]  Array<string>
     *
     *    {memberService:["xxx","kkk"]} :UrlPattern
     *     ()=>{  //Function
     *        //TODO
     *        return boolean
     *     }
     *
     */
    pattern?: string | Array<string> | Array<RegExp> | UrlPattern | Function;

    /**
     * 处理的filter
     */
    filter: ApiFilter<any, any>;

    /**
     * 过滤器的名称
     */
    filterName?: string;


    /**
     * 执行方式
     */
    executeMethod?: ExecuteMethod
}
