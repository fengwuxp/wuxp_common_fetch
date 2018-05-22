import "../../../types/PromiseExt";
import {HttpErrorHandler} from "../error/HttpErrorHandler";
import {FilterHandler} from "../filter/handler/FilterHandler";

/**
 * Api客户端请求接口
 */
export abstract class ApiClientInterface<T> {

    /**
     * 是否使用过滤器机制
     * @type {boolean}
     */
    protected filterHandler: FilterHandler;

    /**
     * http错误处理者
     */
    protected httpErrorHandler: HttpErrorHandler;


    constructor(httpErrorHandler: HttpErrorHandler, filterHandler: FilterHandler) {

        this.httpErrorHandler = httpErrorHandler;
        this.filterHandler = filterHandler;
    }


    protected useFilter = () => {
        return this.filterHandler != null;
    };

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
