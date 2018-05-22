import {isFunction, isNullOrUndefined} from "util";
import {WeexStreamOption} from "../../option/WeexStreamOption";
import {ApiClientInterface} from "../../base/ApiClientInterface";
import {stream} from "../../../utils/ExportWeexSdkModel";
import GlobalApiConfig from "../../../config/GlobalAipConfig";
import {DataType} from "../../enums/DataType";
import {ReqMethod} from "../../enums/ReqMethod";
import {isWeb} from "../../../utils/WeexEnvUtil";
import {argumentsResolver} from "../../utils/ArgumnetsResolver";
import {PostHandlerResult} from "../../filter/model/PostHandlerResult";
import {stringify} from "querystring";
import {HttpErrorHandler} from "../../error/HttpErrorHandler";
import {FilterHandler} from "../../filter/handler/FilterHandler";
import {REQUEST_ERROR} from "../../filter/handler/FilterHandlerByAsync";
import {BaseApiContext} from "../../base/BaseApiOptions";


const IS_WEB: boolean = isWeb();


/**
 * 请求服务端的api统一接口失效
 */
class ApiClientWeex extends ApiClientInterface<WeexStreamOption> {


    constructor(httpErrorHandler: HttpErrorHandler<any>, filterHandler: FilterHandler) {
        super(httpErrorHandler, filterHandler);
    }

    /**
     * post请求
     *
     */
    post(option: WeexStreamOption) {
        option.method = ReqMethod.POST;
        return this.fetch(option);
    }


    /**
     * get请求
     */
    get(option: WeexStreamOption) {
        option.method = ReqMethod.GET;
        return this.fetch(option);
    }


    /**
     * 获取数据
     * @param option
     * 默认 Content-Type 是 ‘application/x-www-form-urlencoded’。
     * 如果你需要通过 POST json ， 你需要将 Content-Type 设为 ‘application/json’。
     */
    fetch(option: WeexStreamOption): any {

        if (GlobalApiConfig['GLOBAL_USER_DATA_TYPE_JSONP'] && IS_WEB) {
            //全局开启jsonp
            option.dataType = DataType.JSONP;
        }


        //url 拼接
        if (!(option.url.startsWith("http://") || option.url.startsWith("https://"))) {
            option.url = GlobalApiConfig.API_BASE_URL + option.url;
        }

        //使用filter
        this.filterHandler.preHandle(option).then(() => {  //添加查询参数的处理
            let {
                progressCallback,
                callBack
            } = option;

            let request = this.buildRequest(option);
            console.log("请求参数", request);
            stream.fetch(request, function (response) {

                /**
                 * 响应结果回调，回调函数将收到如下的 response 对象：
                 * status {number}：返回的状态码
                 * ok {boolean}：如果状态码在 200~299 之间就为真
                 * statusText {string}：状态描述文本
                 * data {Object | string}: 返回的数据，如果请求类型是 json 和 jsonp，则它就是一个 object ，如果不是，则它就是一个 string。
                 * headers {Object}：响应头
                 */
                let data;
                if (!response.ok) {
                    //请求没有正确响应
                    console.error("响应状态码：" + response.status + " 状态描述：" + response.statusText);
                    data = REQUEST_ERROR;
                } else {
                    data = response.data;
                }
                // console.log("响应信息："+JSON.stringify(response));
                callBack(data, response.headers);
            }, function (resp) {
                //console.log(resp);
                /**
                 * 关于请求状态的回调。 这个回调函数将在请求完成后就被调用:
                 * readyState {number}：当前状态state:’1’: 请求连接中opened:’2’: 返回响应头中received:’3’: 正在加载返回数据
                 * status {number}：响应状态码.
                 * length {number}：已经接受到的数据长度. 你可以从响应头中获取总长度
                 * statusText {string}：状态文本
                 * headers {Object}：响应头
                 */

                if (!isFunction(progressCallback)) {
                    // console.warn("未提供 progressCallback回调");
                    return;
                }
                progressCallback(resp);
            });
        }).catch((e) => {
            console.log(e);
        });
    }


    /**
     * 分发
     * 其他参数是接口传入的参数
     */
    dispatch(...p): Promise<Function> {

        const options: WeexStreamOption = argumentsResolver(...p);

        options.context = options.context || {} as BaseApiContext;

        let promise = new Promise((resolve, reject) => {
            //这个写法是为了在调用方法的时候 可以覆盖默认的配置
            options.callBack = (resp) => {
                this.filterHandler.postHandle(options, resp).then((result: PostHandlerResult) => {
                    //code=0 且 过滤器的处理均成功
                    // if (result.isSuccess) {
                    //     resolve(result.resp[0].data, result.resp[0]);
                    // } else {
                    //     reject(result.resp[0]);
                    // }
                    if (result.isSuccess) {
                        options.context.respData = result.resp[0];
                        return Promise.resolve(result.resp[0].data);
                    } else {
                        return Promise.reject(result.resp[0]);
                    }
                }).catch((result: PostHandlerResult) => {
                    //过滤器处理失败
                    reject(result.resp[0]);
                });
            };
            this.request(reject, options);
        });
        //设置context
        promise.setContext<BaseApiContext>(options.context);
        return promise;
    }

    /**
     * 请求
     * @param reject
     * @param options
     */
    private request = (reject: Function, options: WeexStreamOption) => {

        let method = ReqMethod[options.method];

        this[method.toLowerCase()](options);
    };

    private buildRequest = (reqParams: WeexStreamOption): any => {
        let {
            url,
            data,
            method,
            dataType,
            queryPrams,
            headers
        } = reqParams;

        if (isNullOrUndefined(headers)) {
            headers = {};
        }

        const queryString: string = stringify(queryPrams);
        if (url.indexOf("?") > 0) {
            url += `&${queryString}`;
        } else {
            url += `?${queryString}`;
        }

        if (dataType === DataType.JSONP) {
            method = ReqMethod.GET;    //如果是jsonp请求，强制设置为get方式提交
        }

        // console.log(" ReqMethod--> " + ReqMethod[method])
        // console.log(" DataType--> " + DataType[type])

        if (method === ReqMethod.POST) {
            headers['Content-Type'] = "application/json;charset=UTF-8";
            // console.log("post url->" + url);
            // console.log(JSON.stringify(headers));
        } else if (method === ReqMethod.GET) {
            //查询字符串
            url += `&clientId=${data['clientId']}`;
            url += `&data=${JSON.stringify(data)}`;
            url = encodeURI(url as string);   //URL encode
            data = null;
        }


        //WEEX stream对象 https://weex.apache.org/cn/references/modules/stream.html

        let reqMethod = ReqMethod[method];

        return {
            method: reqMethod,               //请求方法get post
            url,                      //请求url
            type: dataType.toString().toLowerCase(),    //响应类型, json,text 或是 jsonp {在原生实现中其实与 json 相同)
            headers,             //headers HTTP 请求头
            body: (data == null || reqMethod === "GET") ? null : JSON.stringify(data)     //参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。请求不支持 body 方式传递参数，请使用 url 传参。
        };
    }

}

export default ApiClientWeex;
