import {FetchOption} from "../../option/FetchOption";
import {isNullOrUndefined} from "util";
import {ReqMethod} from "../../enums/ReqMethod";
import {WeexStreamOption} from "../../option/WeexStreamOption";
import ApiAbstractFilter from "../ApiAbstractFilter";
import {apiSign, joinParamByReq} from "./ApiSginUtils";

/**
 * 需要签名的过滤器
 */
export class NeedSignFilter extends ApiAbstractFilter {


    private clientId: string;

    /**
     * 签名秘钥
     */
    private clientSecret: string;


    private channelCode: string;


    constructor(clientId: string, clientSecret: string, channelCode: string) {
        super();
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.channelCode = channelCode;
    }

    preHandle(options: FetchOption | WeexStreamOption): boolean | Promise<boolean> {

        let {
            url,
            method,
            data,
            queryPrams,
            signFields,
        } = options;

        data['clientId'] = this.clientId;
        data['timestamp'] = new Date().getTime().toString();

        if (!isNullOrUndefined(queryPrams) && Object.keys(queryPrams).length > 0 && method === ReqMethod.GET) {
            if (url.indexOf("?") >= 0) {
                url += "&";
            } else {
                url += "?"
            }
            url += joinParamByReq(queryPrams);
        }
        data['channelCode'] = this.channelCode;
        data['sign'] = apiSign(signFields, data, this.clientSecret);

        let body: String = "";
        if (!isNullOrUndefined(data)) {
            body = joinParamByReq(data);
            options.data = body;
        }
        return true;
    }


}


