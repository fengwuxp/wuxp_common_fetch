import {polyfill} from "es6-promise";
import 'es5-shim'
import "whatwg-fetch";
import 'fetch-detector'
import 'fetch-ie8'

import {ApiClientInterface} from "../../base/ApiClientInterface";
import {FetchOption} from "../../option/FetchOption";
import {ReqMethod} from "../../enums/ReqMethod";
import {DataType} from "../../enums/DataType";
import FilterFetchHandler from "../../filter/FilterFetchHandlerByAsync";
import GlobalApiConfig from "../../../config/GlobalAipConfig";
import {argumentsResolver} from "../../utils/ArgumnetsResolver";
import {PostHandlerResult} from "../../filter/model/PostHandlerResult";
import {isNullOrUndefined} from "util";
import {stringify} from "querystring";
import {HttpErrorHandler} from "../../error/HttpErrorHandler";
import FetchHttpErrorHandler from "../../error/FetchHttpErrorHandler";

const filterHandler = new FilterFetchHandler();

/**
 * 默认的请求头配置
 * @type {{Accept: string; "Content-Type": string}}
 */
const DEFAULT_HEADERS: object = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded'
};

polyfill();


/**
 * 基于fetch实现的apiClient
 * Created by wuxp on 2017/5/12.
 */
export default class ApiClientFetch extends ApiClientInterface<FetchOption> {


    //默认的fetchOptions
    private DEFAULT_FETCH_OPTION: FetchOption;


    constructor(httpErrorHandler: HttpErrorHandler<any> = new FetchHttpErrorHandler(),
                userFilter?: boolean,
                options: FetchOption = {} as FetchOption) {
        super(httpErrorHandler, userFilter);
        this.DEFAULT_FETCH_OPTION = options
    }

    /**
     * post请求
     * @param option
     * @return {Promise<Response>}
     */
    post(option: FetchOption): Promise<any> {
        option.method = ReqMethod.POST;
        return this.fetch(option);
    }

    /**
     * get请求
     * @param option
     * @return {Promise<Response>}
     */
    get(option: FetchOption): Promise<any> {
        option.method = ReqMethod.GET;
        return this.fetch(option);
    }

    /**
     * fetch 数据
     * @param option
     * @return {Promise<TResult2|any>}
     */
    fetch(option: FetchOption): Promise<any> {

        const fetchOptions: FetchOption = {
            ...this.DEFAULT_FETCH_OPTION,
            ...option,
        };

        const {
            dataType
        } = fetchOptions;

        //TODO 请求超时
        //TODO 文件上传等进度

        if (!this.useFilter(fetchOptions)) {
            //不使用过滤器处理
            //构建Request请求对象
            const request = this.buildRequest(fetchOptions);
            return fetch(request).then((response: Response) => {
                return this.checkStatus(response, fetchOptions);
            }).then((response: Response) => {
                return this.parse(response, dataType);
            });
        }
        if (isNullOrUndefined(fetchOptions.headers)) {
            fetchOptions.headers = {};
        }
        //使用filter
        return filterHandler.preHandle(fetchOptions).then(() => {
            //构建Request请求对象
            const request = this.buildRequest(fetchOptions);
            return fetch(request).then((response: Response) => {
                return this.checkStatus(response, fetchOptions);
            }).then((response: Response) => {
                return this.parse(response, dataType).then((data) => {
                    return filterHandler.postHandle(fetchOptions, data).then((result: PostHandlerResult) => {
                        return new Promise(((resolve, reject) => {
                            if (result.isSuccess) {
                                resolve(...result.resp);
                            } else {
                                reject(...result.resp);
                            }
                        }));
                    });
                });
            });
        });
    }


    /**
     * 分发请求
     * @return {Promise<Function>}
     */
    dispatch(...p): Promise<Function> {
        const options: FetchOption = argumentsResolver(...p);
        let method = ReqMethod[options.method];
        return this[method.toLowerCase()](options);
    }


    /**
     * 是否使用过滤器
     * @param {FetchOption} options
     * @returns {boolean}
     */
    private useFilter(options: FetchOption) {

        if (isNullOrUndefined(options.useFilter)) {
            return this.getUserFilter();
        } else {
            //强制使用/不使用
            return options.useFilter;
        }
    }

    /**
     * 构建请求对象
     * @param {FetchOption} options
     * @return {Request}
     */
    private buildRequest(options: FetchOption): RequestInfo {
        let {
            url,
            method,
            headers,
            data,
            queryPrams,
            referrer,
            referrerPolicy,
            mode,
            credentials,
            redirect,
            cache,
            integrity,
            keepalive,
            window,
            serializeType
        } = options;


        if (isNullOrUndefined(serializeType)) {
            serializeType = "default";
        }

        //默认的序列化处理方式(以表单的形式提交数据)
        const isDefaultSerialize = serializeType === "default";

        const requestHeaders = Object.assign({}, isDefaultSerialize ? DEFAULT_HEADERS : {}, headers);

        const reqMethodElement = ReqMethod[method];

        if (!(url.startsWith("http://") || url.startsWith("https://"))) {
            url = GlobalApiConfig.API_BASE_URL + url;
        }

        //查询参数
        let queryString: string = stringify(queryPrams);
        if (queryString.length > 0) {
            if (url.indexOf("?") > 0) {
                url = `&${queryString}`;
            } else {
                url = `?${queryString}`;
            }
        }
        let body: any;
        //GET请求不能携带body
        if (reqMethodElement === ReqMethod.POST) {
            if (isDefaultSerialize) {
                body = stringify(data);
            } else {
                body = data;
            }
        }


        //构建Request请求对象

        return new Request(url, {
            method: reqMethodElement,
            headers: requestHeaders,
            body,
            referrer,
            referrerPolicy,
            mode,
            credentials,
            redirect,
            cache,
            integrity,
            keepalive,
            window
        });
    }


    /**
     * 格式化数据
     * @param response
     * @param type
     * @return {any}
     */
    private parse(response: Response, type: DataType = DataType.JSON): Promise<any> {


        //TODO 请求进度
        // let reader = response.body.getReader();
        // let bytesReceived = 0;
        //
        // // read() returns a promise that resolves when a value has been received
        // reader.read().then(function processResult(result) {
        //     // Result objects contain two properties:
        //     // done  - true if the stream has already given you all its data.
        //     // value - some data. Always undefined when done is true.
        //     if (result.done) {
        //         console.log("Fetch complete");
        //         return;
        //     }
        //
        //     // result.value for fetch streams is a Uint8Array
        //     bytesReceived += result.value.length;
        //     console.log('Received', bytesReceived, 'bytes of data so far');
        //
        //     // Read some more, and call this function again
        //     return reader.read().then(processResult);
        // });

        switch (type) {
            case DataType.JSON:
                return this.parseJSON(response);
            case DataType.TEXT:
                return this.parseText(response);
            case DataType.HTML:
                return this.parseText(response);
            case DataType.SCRIPT:
                return this.parseJSON(response);
            case DataType.BLOB:
                return this.paresBlob(response);
            default:
                const error = new Error("不支持的结果数据类型：" + type);
                error['response'] = response;
                throw error;
        }

    }

    private parseJSON(response: Response): Promise<any> {
        return response.json();
    }

    private parseText(response: Response): Promise<string> {
        return response.text();
    }

    private paresArrayBuffer(response: Response): Promise<ArrayBuffer> {
        return response.arrayBuffer();
    }

    private paresBlob(response: Response): Promise<Blob> {
        return response.blob();
    }

    private paresFormData(response: Response): Promise<FormData> {
        return response.formData();
    }


    /**
     * @function 检测返回值的状态
     * @param response
     * @param option 请求参数配置
     * @returns Response
     */
    private checkStatus(response: Response, option: FetchOption): Response {

        if (this.httpErrorHandler.judgmentHttpRequestIsSuccess(response)) {
            return response;
        } else {
            //加入http 请求error统一处理
            let requestError = this.httpErrorHandler.handleRequestError(response, option);
            if (requestError !== true) {
                //抛出错误
                const error = new Error(response.statusText);
                error['response'] = response;
                throw error;
            }

            return response;
        }

    }
}
