import {ApiFilter} from "./ApiFilter";
import {PostHandlerResult} from "./model/PostHandlerResult";


/**
 * api filter abstract
 */
export default abstract class ApiAbstractFilter implements ApiFilter {


    constructor() {
    }

    public preHandle(params: any): boolean | Promise<boolean> {
        return true;
    }

    public postHandle(data: any,context?: any): boolean {
        return true;
    }
}
