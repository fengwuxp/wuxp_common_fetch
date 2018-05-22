import {getDefaultFilter, getFilters} from "./FilterContainer";
import {UrlPattern} from "../model/UrlPattern";
import {FilterItem} from "../model/FilterItem";
import {isArray, isNullOrUndefined} from "util";

/**
 * url 解析
 */


//不处理的表达式
const NO_HANDLE_PATTER: string = "**";

/**
 * url parser
 * @param {any} options
 * @param basePath 请求根路径
 * @return {Promise<any>}
 */
export function urlParser(options: any, basePath: string): Array<FilterItem> {

    const {url} = options;
    //获取uri

    const uri: string = url;//url.replace(basePath, "");//.split("/");

    // console.log("URI-> " + uri);
    let filters: Array<FilterItem> = getFilters();

    //默认的filter
    let defaultFilter: Array<FilterItem> = getDefaultFilter();


    /**
     * 匹配要执行的filter
     * @type {Array<FilterItem>}
     */
    let executionList: Array<FilterItem> = [];

    for (let i = 0; i < filters.length; i++) {

        let item: FilterItem = filters[i];

        let {pattern} = item;

        if (isNullOrUndefined(pattern)) {
            //不存在值，表示都不处理
            pattern = NO_HANDLE_PATTER;
        }

        let patternType = pattern.constructor;

        let useFilter = false;

        if (patternType === String) {
            useFilter = this.urlPatternParserByString(pattern as string, uri);
        } else if (patternType === Array) {
            //是字符串数组
            useFilter = this.urlPatternParser(pattern as Array<string | RegExp>, uri);
        } else if (patternType === Function) {
            useFilter = (pattern as Function)(uri);
        } else if (patternType === Object) {
            useFilter = this.urlPatternParserByObject(pattern as UrlPattern, uri);
        } else {
            throw new Error("错误的pattern 类型-> " + patternType);
        }

        if (!useFilter) {
            //不需要处理filter
            // console.warn("不使用filter-> " + uri);
            continue;
        } else {
            // console.log("使用filter-> " + uri);
        }
        executionList.push(item);
    }

    //需要执行的filter
    executionList.unshift(...defaultFilter);

    return executionList;

}

/**
 *  url 解析
 * @param {string} pattern
 * @param {string} uri
 * @return {boolean} 是否需要过滤
 */

function urlPatternParserByString(pattern: string, uri: string): boolean {

    if (pattern === NO_HANDLE_PATTER) {
        //表示都不处理
        return false;
    } else {
        return new RegExp("^" + pattern).test(uri);
    }
}

/**
 * url 解析
 * @param {Array<string | RegExp>} patterns
 * @param {string} uri
 * @return {boolean} 是否需要过滤
 */
function urlPatternParser(patterns: Array<string | RegExp>, uri: string): boolean {

    //是否为正则表达式
    let isRegExp = patterns[0].constructor === RegExp// isRegExp(patterns[0]);

    if (!isRegExp) {
        return patterns.some((item: string) => {
            return new RegExp("^" + item).test(uri);
        });
    } else {
        return patterns.some((item: RegExp) => {
            return item.test(uri);
        });
    }
}

/**
 * url 解析
 * @param {UrlPattern} patterns
 * @param {string} uri
 * @return {boolean} 是否需要过滤
 */
function urlPatternParserByObject(patterns: UrlPattern, uri: string): boolean {

    let result: boolean = false;
    let index: number = 0;
    for (const key in patterns) {
        let prefix = "/" + key;// key.substr(0, 1).toLowerCase() + key.substring(1, key.length);

        //匹配开头
        if (uri.indexOf(prefix) !== 0) {
            continue;
        }
        index++;
        let uris = uri.split(prefix);
        //匹配后续内容
        let pattern = patterns[key];
        if (isArray(pattern)) {
            let u: string = uris[1].replace("/", "");
            result = !(pattern as Array<string | RegExp>).some((item: string | RegExp) => {
                //是否为正则表达式
                let isRegExp = item.constructor === RegExp;//isRegExp(item);
                if (isRegExp) {
                    return (item as RegExp).test(u);
                } else {
                    return item as string === u;
                }
            });
        } else {
            result = this.urlPatternParserByString(pattern as string, uri);
        }

        if (result) {
            //处理结束
            return result;
        }
    }
    if (index === 0) {
        //说明没有找到,默认要加入处理
        result = true;
    }
    return result;
}
