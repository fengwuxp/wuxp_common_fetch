import {FetchOption} from "../../option/FetchOption";
import {WeexStreamOption} from "../../option/WeexStreamOption";
import ApiAbstractFilter from "../ApiAbstractFilter";
import {apiSign} from "./ApiSginUtils";
import {ExecuteMethod} from "../model/FilterItem";

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

    executeMethod = ExecuteMethod.ONLY_PREV;

    preHandle(options: FetchOption | WeexStreamOption): boolean | Promise<boolean> {

        let {
            data,
            signFields,
        } = options;

        //签名处理
        data['clientId'] = this.clientId;
        data['timestamp'] = new Date().getTime().toString();
        data['channelCode'] = this.channelCode;
        data['sign'] = apiSign(signFields, data, this.clientSecret);

        return true;
    }


}


