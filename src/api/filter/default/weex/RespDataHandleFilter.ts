import ApiAbstractFilter from "../../ApiAbstractFilter";
import {ApiResp} from "../../../model/ApiResp";
import {isFunction} from "util";
import {BaseApiOptions} from "../../../base/BaseApiOptions";
import {ExecuteMethod} from "../../model/FilterItem";

/**
 * 对相应数据进行预处理
 */
export class RespDataHandleFilter extends ApiAbstractFilter {


    executeMethod = ExecuteMethod.ONLY_POST;

    postHandle(resp: ApiResp<any>, options: BaseApiOptions): boolean {

        const {code} = resp;


        if (code === 0) {
            return true
        } else {
            return false;

        }

    }
}
