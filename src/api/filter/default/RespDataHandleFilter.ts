import ApiAbstractFilter from "../ApiAbstractFilter";
import {ApiResp} from "../../model/ApiResp";
import {isFunction} from "util";
import {BaseApiOptions} from "../../base/BaseApiOptions";

/**
 * 对相应数据进行预处理
 */
export class RespDataHandleFilter extends ApiAbstractFilter {


    postHandle(resp: ApiResp<any>, options: BaseApiOptions): boolean {

        const {code} = resp;


        if (code === 0) {
            return true
        } else {
            return false;

        }

    }
}
