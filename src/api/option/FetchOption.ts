import {ReqMethod} from "../enums/ReqMethod";
import {DataType} from "../enums/DataType";
import {BaseApiOptions} from "../base/BaseApiOptions";

/**
 * fetch 请求配置
 * Created by wuxp on 2017/5/12.
 */
export interface FetchOption extends BaseApiOptions {

    /**
     * referrer
     */
    referrer?: string;


    referrerPolicy?: ReferrerPolicy;

    /**
     * 请求的模式，主要用于跨域设置，cors, no-cors, same-origin
     */
    mode?: RequestMode;

    /**
     * 是否发送Cookie
     */
    credentials?: RequestCredentials;

    /**
     * 收到重定向请求之后的操作，follow, error, manual
     */
    redirect?: RequestRedirect;

    /**
     * 缓存模式
     */
    cache?: RequestCache;

    /**
     * 完整性校验
     */
    integrity?: string;

    /**
     * 长连接
     */
    keepalive?: boolean;

    window?: any;


    /**
     * 数据序列化处理
     * none:不做任何处理
     * default：以表单的方式处理
     * 默认值：default
     */
    serializeType?: SerializeType


}

export enum SerializeType {

    //不处理
    NONE,

    //json
    JSON,

    //form data
    FORM_DATA
}

/**
 * 构建请求配置对象
 * @param req :FetchOption
 * @return {{}&{keepalive: boolean, useProgressBar: boolean, cache: string, dataType: DataType, credentials: string, mode: string}&V}
 */
const buildFetchOption = (req: FetchOption): FetchOption => {

    let options: FetchOption = {
        url: "",
        method: ReqMethod.POST,
        dataType: DataType.JSON,
        data: {},
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        signFields: [],
        queryPrams: {},
        keepalive: false,
        useProgressBar: true,   //使用进度提示条
        referrerPolicy: "",
        cache: "no-cache",    //不缓存
        credentials: "include", //携带cookie
        mode: "cors"   //不跨域
    };

    return Object.assign({}, options, req);
};

export default buildFetchOption;
