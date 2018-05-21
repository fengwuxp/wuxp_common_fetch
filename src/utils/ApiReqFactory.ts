/**
 * Created by wuxp on 2017/5/9.
 */
import {ApiReq} from "../api/model/ApiReq";
import {ApiQueryReq} from "../api/model/ApiQueryReq";

class ReqImpl implements ApiReq {


    constructor() {
    }
}

class QueryReqImpl implements ApiQueryReq {

    constructor() {
    }
}

class ApiReqFactory {


    constructor() {

    }

    /**
     * 获取一个请求req对象
     * @param params 是一个对象列表
     */
    public static newInstancesReq<T extends ApiReq>(...params: Array<T>): T {
        let reqImpl = new ReqImpl();
        return Object.assign({}, reqImpl, ...params) as T;
    };

    /**
     * 获取一个查询req对象
     *@param params 是一个对象列表
     */
    public static newInstancesQueryReq<T extends ApiQueryReq>(...params: Array<T>): T {
        let reqImpl = new QueryReqImpl();
        return Object.assign({}, reqImpl, ...params) as T;
    }
}

export default ApiReqFactory;
