/**
 * Created by wuxp on 2017/5/6.
 */

import {HttpErrorHandler} from "../error/HttpErrorHandler";

/**
 * Api客户端请求接口
 */
export abstract class ApiClientInterface<T> {

    /**
     * 是否使用过滤器机制
     * @type {boolean}
     */
    protected _userFilter: boolean;

    /**
     * http错误处理者
     */
    protected httpErrorHandler: HttpErrorHandler<any>;


    constructor(httpErrorHandler: HttpErrorHandler<any>, userFilter: boolean = true) {

        this.httpErrorHandler = httpErrorHandler;

        this._userFilter = userFilter;
    }

    /**
     * 开启过滤器机制
     * @param {boolean} use
     */
    openUseFilter(use: boolean = true) {
        this._userFilter = use;
    }

    getUserFilter() {
        return this._userFilter;
    }


    /**
     * post请求
     * @param option
     */
    abstract post(option: T): any;


    /**
     * get请求
     * @param option
     */
    abstract get(option: T): any;

    /**
     * 抓取数据
     * @param option
     */
    abstract fetch(option: T): any;

    /**
     * 分发
     * @param p 不定项参数，有具体的实现去解释
     */
    abstract dispatch(...p): Promise<any> ;


}
