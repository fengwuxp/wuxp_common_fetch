import {isNullOrUndefined, isString} from "util";
// import md5 from "md5";
const md5=require("md5")
/**
 * ap请求时签名
 * @param fields 需要签名的列
 * @param params 请求参数
 * @param clientSecret
 * @return {string}
 */
export function apiSign(fields: Array<string>, params: any, clientSecret: string): string {
    console.log("需要签名的列->", fields);
    if (isNullOrUndefined(fields)) {
        return "";
    }
    let value = "";
    fields.sort().forEach(function (item) {
        let param = params[item.toString()];
        if (isNullOrUndefined(param) || (isString(param) && param.trim().length === 0)) {
            // console.warn("参与签名的参数：" + item + " 未传入!");
            throw new Error("参与签名的参数：" + item + " 未传入或值无效!");
        }
        value += `${item}=${param}&`;
    });
    //加入clientId 、clientSecret 时间戳参与签名
    value += `clientId=${params.clientId }&clientSecret=${clientSecret}&timestamp=${ params.timestamp}`;

    let channelCode: string = params.channelCode;
    if (!isNullOrUndefined(channelCode) && channelCode.trim().length > 0) {
        value += `&channelCode=${channelCode}`; //加入渠道编号
    }

    return md5(value);
}

/**
 * 将一个对象转换成url参数字符串
 * @param req
 * @return {string}
 */
export function joinParamByReq(req: Object): string {

    let result = "";
    for (let key in req) {
        let param = req[key];
        if (isNullOrUndefined(param)) {
            continue;
        }
        if (param.constructor === Object || param.constructor === Array) {
            param = JSON.stringify(param);
        }
        result += `&${key}=${param}`
    }
    result = result.substr(0, result.length - 1);

    return result;
}
