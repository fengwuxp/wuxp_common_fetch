import {ApiFilter} from "../ApiFilter";
import {UrlPattern} from "./UrlPattern";

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
}
