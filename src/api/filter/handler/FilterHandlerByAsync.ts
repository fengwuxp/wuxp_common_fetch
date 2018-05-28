import {BaseApiOptions} from "../../base/BaseApiOptions";
import {PostHandlerResult} from "../model/PostHandlerResult";
import {ExecuteMethod, FilterItem} from "../model/FilterItem";
import {FilterHandler} from "./FilterHandler";
import {isNullOrUndefined} from "util";
import {ApiResp} from "../../model/ApiResp";


/**
 * filter　处理器
 * TODO 支持ulr级别的filter过滤
 */
export default class FilterHandlerByAsync implements FilterHandler<BaseApiOptions> {

    protected filterList: FilterItem[];

    constructor(filterList: FilterItem[]) {
        this.filterList = filterList;
    }

    /**
     * filter 前置处理
     * @param {BaseApiOptions} options
     * @return {Promise<boolean>}
     */
    public preHandle = (options: BaseApiOptions): Promise<boolean> => {

        return this.doFilter(options, "preHandle", null);
    };

    /**
     *  filter 后置处理
     * @param {BaseApiOptions} options
     * @param data 请求结果数据
     * @return {Promise<boolean>}
     */
    public postHandle = (options: BaseApiOptions, data: any): Promise<PostHandlerResult> => {

        return this.doFilter(options, "postHandle", data);
    };

    /**
     * 执行filter
     * @param {BaseApiOptions} options
     * @param {string} fnName 执行的方法名称
     * @param params 参数
     * @return {Promise<boolean|PostHandlerResult>}
     */
    private async doFilter(options: BaseApiOptions, fnName: string, params: ApiResp): Promise<any> {
        const filterItems = this.filterList;
        let i = 0;

        //filterItems.length===0时
        let result: boolean = true;
        if (fnName === "preHandle") {
            while (i < filterItems.length) {
                let apiFilter = filterItems[i].filter;
                if (apiFilter.executeMethod !== ExecuteMethod.ONLY_PREV && apiFilter.executeMethod !== ExecuteMethod.ALL) {
                    //跳过
                    continue;
                }
                i++;
                result = await apiFilter.preHandle(options);
                //处理失败
                if (!result) {
                    return false
                }
            }
            return result;
        } else {
            //请求结果是否成功
            const requestIsSuccess = isNullOrUndefined(params) || params.code !== 0;
            while (i < filterItems.length) {
                let filterItem = filterItems[i];
                i++;
                let apiFilter = filterItem.filter;
                if (apiFilter.executeMethod === ExecuteMethod.ONLY_PREV) {
                    //跳过
                    continue;
                }
                if (requestIsSuccess) {
                    //请求成功
                    if (apiFilter.executeMethod === ExecuteMethod.ONLY_ERROR) {
                        //跳过只在请求失败时才执行的filter
                        continue;
                    }
                } else {
                    //请求失败
                    if (apiFilter.executeMethod === ExecuteMethod.ONLY_SUCCESS) {
                        //跳过只在请求成功时才执行的filter
                        continue;
                    }
                }
                result = await apiFilter.postHandle(params, options);
                if (!result) {
                    return {
                        isSuccess: false,
                        resp: [params]
                    };
                }
            }
            return {
                isSuccess: true,
                resp: [params]
            };
        }


    }


}

