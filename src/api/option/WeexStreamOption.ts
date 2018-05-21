import {BaseApiOptions} from "../base/BaseApiOptions";

/**
 * weex stream请求参数对象
 */
export interface WeexStreamOption extends BaseApiOptions{


    /**
     * 响应回调
     */
    callBack?: Function;

    /**
     * 关于请求状态的回调。 这个回调函数将在请求完成后就被调用:
     */
    progressCallback?: Function;



}
