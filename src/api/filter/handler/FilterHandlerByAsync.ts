import {BaseApiOptions} from "../../base/BaseApiOptions";
import {PostHandlerResult} from "../model/PostHandlerResult";
import {ExecuteMethod, FilterItem} from "../model/FilterItem";
import {FilterHandler} from "./FilterHandler";

/**
 * 请求异常标志
 * @type {string}
 */
export const REQUEST_ERROR: string = "__REQUEST_ERROR__";


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
    private async doFilter(options: BaseApiOptions, fnName: string, params: any): Promise<any> {
        const filterItems = this.filterList;
        let i = 0;

        //filterItems.length===0时
        let result: boolean = true;
        if (fnName === "preHandle") {
            while (i < filterItems.length) {
                let apiFilter = filterItems[i].filter;
                i++;
                result = await apiFilter.preHandle(options);
                //处理失败
                if (!result) {
                    return false
                }
            }
            return result;
        } else {
            while (i < filterItems.length) {
                let filterItem = filterItems[i];
                i++;
                let apiFilter = filterItem.filter;
                if (params === REQUEST_ERROR) {
                    //请求失败
                    if (filterItem.executeMethod !== ExecuteMethod.ALL) {
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

