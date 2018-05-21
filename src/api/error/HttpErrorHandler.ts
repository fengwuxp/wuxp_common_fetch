/**
 * http 请求错误处理
 */
export interface HttpErrorHandler<T> {

    /**
     * 判断本次http请求是否成功
     * @param {T} response
     * @returns {boolean}
     */
    judgmentHttpRequestIsSuccess: (response: T) => boolean;


    /**
     * 处理请求错误
     * @param {T} response
     * @param request 请求参数
     */
    handleRequestError: (response: T, request: any) => boolean | void;

    /**
     * 添加一个错误处理者 httpCode http状态码
     * @param {number} httpCode
     * @param {HttpCodeHandler} handler 处理者
     */
    addErrorCodeHandler: (httpCode: number, handler: HttpCodeHandler) => HttpErrorHandler<T>;


    /**
     * 设置一个默认的错误处理者
     * 在错误状态处理时，如果没有找到对应错误码的处理者，则使用默认处理者
     * 默认处理者有且仅有一个
     * @param {HttpCodeHandler} handler
     */
    setDefaultErrorHandler: (handler: HttpCodeHandler) => void
}

/**
 * http code处理者
 * {boolean|void} true 表示强制忽略本次请求的异常，不会继续抛出该请求的异常
 */
export type HttpCodeHandler = <R/*响应数据类型*/, Q/*请求数据类型*/>(response: R, request: Q) => boolean | void

