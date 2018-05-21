import ApiAbstractFilter from "../ApiAbstractFilter";
import {ApiResp} from "../../model/ApiResp";
import {PostHandlerResult} from "../model/PostHandlerResult";

/**
 * 对相应数据进行预处理
 */
export class RespDataHandleFilter extends ApiAbstractFilter {


    preHandle(params: any): boolean | Promise<boolean> {
        return super.preHandle(params);
    }

    postHandle(resp: ApiResp<any>): boolean {
        const {data, code} = resp;
        if (code === 0) {
            return true
        } else {
            return false;

        }

    }
}
