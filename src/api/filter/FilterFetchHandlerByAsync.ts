import {urlParser} from "./UrlMatchUtils";
import {BaseApiOptions} from "../base/BaseApiOptions";
import {PostHandlerResult} from "./model/PostHandlerResult";


export default class FilterFetchHandlerByAsync {


    constructor() {
    }

    /**
     * filter 前置处理
     * @param {BaseApiOptions} options
     * @return {Promise<boolean>}
     */
    public preHandle = (options: BaseApiOptions): Promise<boolean> => {

        return this.doFilter(options, "preHandle",null);
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
        const filterItems = urlParser(options, "");
        let i = 0;

        //filterItems.length===0时
        let result: boolean = true;
        if (fnName === "preHandle") {
            while (i < filterItems.length) {
                let apiFilter = filterItems[i].filter;
                result = await apiFilter.preHandle(options);
                //处理失败
                if (!result) {
                    return false
                }
                i++;
            }
            return result;
        } else {
            while (i < filterItems.length) {
                let apiFilter = filterItems[i].filter;
                result = await apiFilter.postHandle(params,options);
                if (!result) {
                    return {
                        isSuccess: false,
                        resp: [params]
                    };
                }
                i++;
            }
            return {
                isSuccess: true,
                resp: [params]
            };
        }


    }


}

