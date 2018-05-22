import {ApiResp} from "../../model/ApiResp";

/**
 * post handler处理结果
 */

export interface PostHandlerResult<T=any> {

    /**
     * 处理成功
     */
    isSuccess: boolean;

    /**
     *处理完的结果数据
     */
    resp: Array<ApiResp<T>>;


}
