import {ApiFilter} from "./ApiFilter";
import {PostHandlerResult} from "./model/PostHandlerResult";
import {ExecuteMethod} from "./model/FilterItem";


/**
 * api filter abstract
 */
export default abstract class ApiAbstractFilter<T=any, R=any> implements ApiFilter<T, R> {


    constructor() {
    }

    executeMethod: ExecuteMethod = ExecuteMethod.ALL;


    public preHandle(options: T): boolean | Promise<boolean> {
        return true;
    }

    public postHandle(data: R, options: T): boolean {
        return true;
    }
}
