import {Action} from "./Action";

/**
 * Created by wuxp on 2017/5/4.
 * 统一响应对象
 */

export interface ApiResp<T=any> {

    /**
     * 请求结果code 0表示成功
     */
    readonly code: number;

    /**
     * 请求结果 消息
     */
    readonly message: string;

    /**
     * 消息详情，一般用于描述异常信息
     */
    readonly detailMessage: string;

    /**
     * 请求结果数据
     */
    readonly data: T;

    /**
     * 请求是否成功
     */
    readonly success: boolean;

    /**
     * 请求结果动作配置描述
     */
    readonly actions: Action[]
}
