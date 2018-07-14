import "../../../types/PromiseExt";
import {HttpErrorHandler} from "../error/HttpErrorHandler";
import {FilterHandler} from "../filter/handler/FilterHandler";
import {Task, TaskStatus} from "../../task/Task";
import AbstractTask from "../../task/AbstractTask";
import {BaseApiOptions} from "./BaseApiOptions";

/**
 * Api客户端请求接口
 */
export abstract class ApiClientInterface<T extends BaseApiOptions> extends AbstractTask {

    /**
     * 是否使用过滤器机制
     * @type {boolean}
     */
    protected filterHandler: FilterHandler;

    /**
     * http错误处理者
     */
    protected httpErrorHandler: HttpErrorHandler;

    protected requestOptions: T;


    constructor(httpErrorHandler: HttpErrorHandler, filterHandler: FilterHandler) {
        super();
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


    /**
     * 请求已经完成
     */
    completed = () => {
        this.status = TaskStatus.COMPLETED;
    };


    /**
     * 放弃本次请求
     */
    throwAway = () => {
        this.status = TaskStatus.THROW_AWAY;
        if (this.requestOptions != null) {
            //执行后置处理
            this.filterHandler.postHandle(this.requestOptions, {});
        }
    };


}
